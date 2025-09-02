import React from "react"
import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from "recharts"

// Room occupancy data
const rooms = {
  A101: { avgOccupancy: 40, peakOccupancy: 60 },
  A102: { avgOccupancy: 70, peakOccupancy: 90 },
  Collab: { avgOccupancy: 60, peakOccupancy: 100 },
  Auditorium: { avgOccupancy: 1009, peakOccupancy: 2009 },
  'Rec Cafe': { avgOccupancy: 100, peakOccupancy: 150 }
}

// Transform data for chart with normalized values for display
const transformValue = (value) => {
  if (value === 0) return 0;
  if (value <= 200) return value;
  // Map values above 200 to start from 250 (leaving gap) and scale down
  return 250 + ((value - 200) / 2800) * 250; // Scale 200-4000 range to 250-500
};

const reverseTransform = (displayValue) => {
  if (displayValue <= 200) return displayValue;
  // Convert back to original scale
  return 200 + ((displayValue - 250) / 250) * 2800;
};

const chartData = Object.entries(rooms).map(([room, data]) => ({
  room: room,
  avgOccupancy: transformValue(data.avgOccupancy),
  peakOccupancy: transformValue(data.peakOccupancy),
  originalAvg: data.avgOccupancy,
  originalPeak: data.peakOccupancy,
}))

const chartConfig = {
  avgOccupancy: {
    label: "Average Occupancy",
    color: "#017a1e",
  },
  peakOccupancy: {
    label: "Peak Occupancy", 
    color: "#22c55e",
  },
}

export default function RoomOccupancyChart() {
  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6 pb-0">
          <h3 className="text-2xl font-semibold leading-none tracking-tight">
            Room Occupancy Analysis
          </h3>
          <p className="text-sm text-gray-600 mt-2">
            Average and peak occupancy across different rooms
          </p>
        </div>
        <div className="p-3 sm:p-6">
          <div className="w-full h-64 sm:h-80 overflow-x-auto">
            <ResponsiveContainer width="100%" height="100%" minWidth={400}>
              <AreaChart
                data={chartData}
                margin={{
                  left: 12,
                  right: 12,
                  top: 12,
                  bottom: 12,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="room"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 10 }}
                  angle={-45}
                  textAnchor="end"
                  height={60}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fontSize: 12 }}
                  domain={[0, 500]}
                  ticks={[0, 50, 100, 150, 200, 500]}
                  tickFormatter={(value) => {
                    if (value <= 200) return value.toString();
                    if (value === 500) return "1000+";
                    return value.toString();
                  }}
                />
                <defs>
                  <linearGradient id="fillAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartConfig.avgOccupancy.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartConfig.avgOccupancy.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                  <linearGradient id="fillPeak" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={chartConfig.peakOccupancy.color}
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="95%"
                      stopColor={chartConfig.peakOccupancy.color}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>
                <Area
                  dataKey="avgOccupancy"
                  type="monotone"
                  fill="url(#fillAvg)"
                  fillOpacity={0.4}
                  stroke={chartConfig.avgOccupancy.color}
                  strokeWidth={2}
                  stackId="a"
                />
                <Area
                  dataKey="peakOccupancy"
                  type="monotone"
                  fill="url(#fillPeak)"
                  fillOpacity={0.4}
                  stroke={chartConfig.peakOccupancy.color}
                  strokeWidth={2}
                  stackId="b"
                />
                <defs>
                  <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#000" floodOpacity="0.1"/>
                  </filter>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="p-6 pt-0">
          <div className="flex flex-col sm:flex-row w-full items-start gap-2 text-sm">
            <div className="grid gap-2">
              <div className="flex items-center gap-2 leading-none font-medium">
                Auditorium shows highest occupancy <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-gray-600 flex items-center gap-2 leading-none">
                Current room utilization data
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: chartConfig.avgOccupancy.color }}
              />
              <span className="text-sm text-gray-600">Average Occupancy</span>
            </div>
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: chartConfig.peakOccupancy.color }}
              />
              <span className="text-sm text-gray-600">Peak Occupancy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}