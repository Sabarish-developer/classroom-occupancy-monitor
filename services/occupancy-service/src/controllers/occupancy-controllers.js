import { getOccupancyData } from '../utils/azure-service.js';

export const occupancyHandler = async (req, res) => {
  try {
    const data = await getOccupancyData(); // no refresh by default
    res.json({ data });
  } catch (err) {
    console.error("Error getting occupancy:", err);
    res.status(500).json({ error: "Failed to fetch occupancy data" });
  }
};

// For refresh button
export const refreshOccupancyHandler = async (req, res) => {
  try {
    const data = await getOccupancyData(true); // force refresh
    res.json({ data });
  } catch (err) {
    console.error("Error refreshing occupancy:", err);
    res.status(500).json({ error: "Failed to refresh occupancy data" });
  }
};

