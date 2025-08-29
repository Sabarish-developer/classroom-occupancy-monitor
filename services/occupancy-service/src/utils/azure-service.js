import { DigitalTwinsClient } from "@azure/digital-twins-core";
import { AzureCliCredential } from "@azure/identity";
import { setCache, getCache } from "./cache.js";
import { config } from "../config/config.js";

const adtUrl = config.azureDigitalTwinUrl;
const credential = new AzureCliCredential();
const client = new DigitalTwinsClient(adtUrl, credential);

// Fetch directly from Azure
async function fetchFromAzure() {
  console.log("Fetching data from Azure Digital Twins...");

  const twins = [];
  const queryResult = client.queryTwins("SELECT * FROM digitaltwins");
  for await (const twin of queryResult) {
    twins.push({
      name: twin.name,
      capacity: twin.capacity,
      occupancy: twin.occupancy,
      status: twin.status,
    });
  }

  // Save to Redis
  await setCache(twins);
  return twins;
}

// Get occupancy data (cached or fresh)
export async function getOccupancyData(forceRefresh = false) {
  const cached = await getCache();

  if (!cached || forceRefresh) {
    return await fetchFromAzure();
  }

  return cached;
}
