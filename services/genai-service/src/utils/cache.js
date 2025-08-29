import { Redis } from "@upstash/redis";
import { config } from "../config/config.js";

const redis = new Redis({
  url: config.redisUrl,
  token: config.redisToken,
});

const OCCUPANCY_KEY = "occupancy_data";

let localCache = null;

export async function fetchLatest() {
  const cached = await redis.get(OCCUPANCY_KEY);
  if (!cached) return null;

  try {
    localCache = typeof cached === "string" ? JSON.parse(cached) : cached;
    console.log("AI Service updated local cache:", localCache);
    return localCache;
  } catch (err) {
    console.error("JSON parse error:", err.message);
    return null;
  }
}

async function pollingLoop() {
  await fetchLatest();
  setTimeout(pollingLoop, 10 * 60 * 1000);
}

// Start Redis polling in background
pollingLoop();

// Export getter
export function getLocalCache() {
  return localCache;
}
