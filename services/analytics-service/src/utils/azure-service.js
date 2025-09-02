import { LogsQueryClient, Durations, LogsQueryResultStatus } from "@azure/monitor-query-logs";
import { DefaultAzureCredential } from "@azure/identity";
import { config } from "../config/config.js";

const credential = new DefaultAzureCredential();
const logsClient = new LogsQueryClient(credential);
const workspaceId = config.azureWorkspaceId;

// Utility to query logs
async function queryLogs(kustoQuery) {
  try {
    const result = await logsClient.queryWorkspace(workspaceId, kustoQuery, {
      duration: Durations.sevenDays, // last 7 days
    });

    if (result.status === LogsQueryResultStatus.Success) {
      return result.tables[0]?.rows || [];
    } else {
      console.error("Query failed:", result.partialError);
      return [];
    }
  } catch (err) {
    console.error("Query error:", err);
    return [];
  }
}

// Compute avg and peak occupancy per room over 7 days
function computeRoomOccupancy(events) {
  const roomData = {};

  for (const [properties] of events) {
    try {
      const occ = typeof properties === "string" ? JSON.parse(properties) : properties;
      for (const [room, value] of Object.entries(occ)) {
        const num = Number(value);
        if (!roomData[room]) roomData[room] = { total: 0, count: 0, peak: 0 };
        roomData[room].total += num;
        roomData[room].count += 1;
        roomData[room].peak = Math.max(roomData[room].peak, num);
      }
    } catch {
      console.warn("Failed to parse event Properties:", properties);
    }
  }

  const result = {};
  for (const room of Object.keys(roomData)) {
    result[room] = {
      avgOccupancy: roomData[room].total / roomData[room].count,
      peakOccupancy: roomData[room].peak,
    };
  }

  return result;
}

// Compute total prompts, avg per day, avg per user
function computePrompts(events) {
  let totalPrompts = 0;
  const daysMap = {}; // day -> total
  const usersSet = new Set();

  for (const [userId, timeGenerated, count] of events) {
    totalPrompts += count;
    const day = new Date(timeGenerated).toLocaleDateString("en-US", { weekday: "short" });
    daysMap[day] = (daysMap[day] || 0) + count;
    usersSet.add(userId);
  }

  const avgPerUser = totalPrompts / (usersSet.size || 1);
  return { dailyPrompts: daysMap, totalPrompts, avgPerUser };
}

export async function runAnalytics() {
  // --- Login metrics ---
  const loginAttempts = await queryLogs(`
    AppMetrics
    | where Name == "LoginAttemptsCount"
    | summarize totalAttempts = sum(ItemCount)
  `);
  const loginSuccess = await queryLogs(`
    AppMetrics
    | where Name == "LoginSuccessCount"
    | summarize successCount = sum(ItemCount)
  `);
  const loginFailure = await queryLogs(`
    AppMetrics
    | where Name == "LoginFailureCount"
    | summarize failureCount = sum(ItemCount)
  `);

  // --- Prompts ---
  const rawPrompts = await queryLogs(`
  AppEvents
  | where Name == "Prompts"
  | extend props = todynamic(Properties)
  | summarize promptCount = count() by tostring(props.userId), bin(TimeGenerated, 1d)
`);
const prompts = computePrompts(rawPrompts);

// --- Ensure last 7 days always appear in dailyPrompts ---
const last7Days = [];
for (let i = 6; i >= 0; i--) {
  const date = new Date();
  date.setDate(date.getDate() - i);
  const day = date.toLocaleDateString("en-US", { weekday: "short" });
  last7Days.push(day);
}

const dailyPromptsComplete = {};
for (const day of last7Days) {
  dailyPromptsComplete[day] = prompts.dailyPrompts[day] || 0;
}

// Replace dailyPrompts with complete one
prompts.dailyPrompts = dailyPromptsComplete;

  // --- Room occupancy ---
  const roomEvents = await queryLogs(`
    AppEvents
    | where Name == "AllRoomsOccupancy"
    | project Properties
  `);
  const rooms = computeRoomOccupancy(roomEvents);

  // Final analytics JSON
  const data = {
    login: {
      attempts: loginAttempts[0]?.[0] || 0,
      success: loginSuccess[0]?.[0] || 0,
      failure: loginFailure[0]?.[0] || 0,
    },
    prompts,
    rooms,
  };

  return data;
}
