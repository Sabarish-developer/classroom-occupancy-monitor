import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { AzureCliCredential } from "@azure/identity";
import { config } from "../config/config.js";

const adtUrl = config.azureDigitalTwinUrl;
const credential = new AzureCliCredential();
const client = new DigitalTwinsClient(adtUrl, credential);

// Twin IDs you provided
const roomIds = ["A101", "A102", "Auditorium", "Collab", "Rec_Cafe"];

function getStatus(occupancy, capacity) {
  if (occupancy === 0) return "empty";
  const ratio = occupancy / capacity;
  if (ratio < 0.3) return "available";
  if (ratio < 0.7) return "busy";
  return "crowded";
}

export async function simulateData() {
  for (const roomId of roomIds) {
    // First, fetch capacity for this twin
    const twin = await client.getDigitalTwin(roomId);
    const capacity = twin.capacity ?? 50; // fallback if missing

    // Generate random occupancy
    const occupancy = Math.floor(Math.random() * (capacity + 1));
    const status = getStatus(occupancy, capacity);

    // Patch update
    const patch = [
      { op: "replace", path: "/occupancy", value: occupancy },
      { op: "replace", path: "/status", value: status },
    ];

    await client.updateDigitalTwin(roomId, patch);
    console.log(`Simulated ${roomId}: occupancy=${occupancy}, status=${status}`);
  }
}
