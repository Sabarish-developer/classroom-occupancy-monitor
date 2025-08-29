import { Redis } from "@upstash/redis";
import { config } from "../config/config.js";

const redis = new Redis({
  url: config.redisUrl,
  token: config.redisToken,
});

const OCCUPANCY_KEY = "occupancy_data";
const CHANNEL = "occupancy_updates";

// Save + publish
export async function setCache(data) {
  console.log("Writing in redis..");
  await redis.set(OCCUPANCY_KEY, JSON.stringify(data));

  // Publish event
  await redis.publish(CHANNEL, "updated");
  console.log("Published occupancy update event");
}

// Read occupancy data from Redis
export async function getCache() {
  const cached = await redis.get(OCCUPANCY_KEY);
  console.log("Reading from redis:", cached);

  // Upstash returns object directly if it detects JSON
  if (!cached) return [];
  if (typeof cached === "string") {
    return JSON.parse(cached); // parse only if string
  }
  return cached.data; // already object/array
}

// Clear cache
export async function clearCache() {
  await redis.del(OCCUPANCY_KEY);
}
