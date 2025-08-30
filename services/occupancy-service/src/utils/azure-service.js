import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { AzureCliCredential } from "@azure/identity";
import { setCache, getCache } from "./cache.js";
import { config } from "../config/config.js";
import { eventLogger } from "./analytics-logger.js";

const adtUrl = config.azureDigitalTwinUrl;
const credential = new AzureCliCredential();
const client = new DigitalTwinsClient(adtUrl, credential);

// Fetch directly from Azure + update Redis
async function fetchFromAzure() {
  console.log("Fetching data from Azure Digital Twins...");

  const twins = [];
  const queryResult = client.queryTwins("SELECT * FROM digitaltwins");
  for await (const twin of queryResult) {
    twins.push({
      name: twin.name,
      capacity: twin.capacity,
      occupancy: twin.occupancy,
    });
  }

  // Save fresh data to Redis
  await setCache(twins);
  return twins;
}

// Get occupancy data
export async function getOccupancyData(forceRefresh = false) {
  if (forceRefresh) {
    // Refresh button → fetch fresh from Azure & update Redis
    return await fetchFromAzure();
  }

  // Normal flow → only from Redis
  const cached = await getCache();
  eventLogger(cached);
  return cached ; 
}
