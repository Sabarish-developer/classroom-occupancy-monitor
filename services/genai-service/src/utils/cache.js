import { Redis } from "@upstash/redis";
import { config } from "../config/config.js";

const redis = new Redis({
  url: config.redisUrl,
  token: config.redisToken,
});

const OCCUPANCY_KEY = "occupancy_data";

// Local in-memory cache
let localCache = null;

// Fetch latest from Redis
async function fetchLatest() {
  const cached = await redis.get(OCCUPANCY_KEY);
  if (!cached) return;
    try {
      localCache = typeof cached === "string" ? JSON.parse(cached) : cached;
      console.log("AI Service updated local cache:", localCache);
    } catch (err) {
      console.error("JSON parse error:", err.message);
    }
  }

// Polling loop every 5 seconds
async function pollLoop() {
  await fetchLatest();
  setTimeout(pollLoop, 5000);
}

// Start polling
pollLoop();

// Export getter for AI logic
export function getLocalCache() {
  return localCache;
}
