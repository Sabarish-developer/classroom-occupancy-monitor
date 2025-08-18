// Simple in-memory cache

let cache = {
  data: null,
  lastUpdated: null,
};

export function setCache(data) {
  cache.data = data;
  cache.lastUpdated = new Date();
}

export function getCache() {
  return cache.data;
}

export function getCacheMeta() {
  return {
    lastUpdated: cache.lastUpdated,
    hasData: !!cache.data,
  };
}

export function clearCache() {
  cache.data = null;
  cache.lastUpdated = null;
}
