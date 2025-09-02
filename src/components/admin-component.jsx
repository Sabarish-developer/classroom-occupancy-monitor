import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { Users, MessageSquare, Building, TrendingUp, Shield, Activity } from 'lucide-react';

export const AdminComponent = ({data}) => {

  if (!data) {
    return <div className="p-6 text-gray-600">Loading admin data...</div>;
  }

  // Transform data for charts
  const dailyPromptsData = Object.entries(data.prompts.dailyPrompts).map(([day, count]) => ({
    day,
    prompts: count
  }));

  const roomOccupancyData = Object.entries(data.rooms).map(([room, occupancy]) => ({
    room,
    avgOccupancy: occupancy.avgOccupancy,
    peakOccupancy: occupancy.peakOccupancy
  }));
  console.log(roomOccupancyData);

  const loginData = [
    { name: 'Success', value: data.login.success, color: '#017a1e' },
    { name: 'Failure', value: data.login.failure, color: '#dc2626' }
  ];

  const successRate = data.login.attempts > 0 ? (data.login.success / data.login.attempts * 100).toFixed(1) : 0;

  const StatCard = ({ title, value, subtitle, icon: Icon, color = '#017a1e' }) => (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300 min-w-0">
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className="text-gray-600 text-xs sm:text-sm font-medium mb-1 truncate">{title}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold truncate" style={{ color }}>{value}</p>
          {subtitle && <p className="text-gray-500 text-xs sm:text-sm mt-1 truncate">{subtitle}</p>}
        </div>
        <div className="p-2 sm:p-3 rounded-full flex-shrink-0 ml-2" style={{ backgroundColor: color + '15' }}>
          <Icon size={20} className="sm:w-6 sm:h-6" style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-2 sm:p-4 md:p-6 overflow-x-hidden">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-sm sm:text-base text-gray-600">Real-time analytics and system overview</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
        <StatCard
          title="Login Success Rate"
          value={`${successRate}%`}
          subtitle={`${data.login.success}/${data.login.attempts} attempts`}
          icon={Shield}
        />
        <StatCard
          title="Total Prompts"
          value={data.prompts.totalPrompts}
          subtitle={`Avg ${data.prompts.avgPerUser} per user`}
          icon={MessageSquare}
        />
        <StatCard
          title="Active Rooms"
          value={Object.values(data.rooms).filter(room => room.avgOccupancy > 0).length}
          subtitle={`of ${Object.keys(data.rooms).length} total`}
          icon={Building}
        />
        <StatCard
          title="Peak Occupancy"
          value={Math.max(...Object.values(data.rooms).map(room => room.peakOccupancy))}
          subtitle="Auditorium"
          icon={Users}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
        {/* Login Analytics */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 min-w-0">
          <div className="flex items-center mb-4 sm:mb-6">
            <Shield className="mr-2 sm:mr-3 flex-shrink-0" style={{ color: '#017a1e' }} size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Login Analytics</h2>
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={loginData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {loginData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value, name) => [`${value} attempts`, name]}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-4">
            {loginData.map((entry, index) => (
              <div key={index} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-xs sm:text-sm text-gray-600">{entry.name}: {entry.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Prompts */}
        <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 min-w-0">
          <div className="flex items-center mb-4 sm:mb-6">
            <Activity className="mr-2 sm:mr-3 flex-shrink-0" style={{ color: '#017a1e' }} size={20} />
            <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Daily Prompt Usage</h2>
          </div>
          <div className="h-48 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyPromptsData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis 
                  dataKey="day" 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                />
                <YAxis 
                  tick={{ fill: '#6b7280', fontSize: 10 }}
                  axisLine={{ stroke: '#e5e7eb' }}
                  width={30}
                />
                <Tooltip 
                  formatter={(value) => [`${value} prompts`, 'Count']}
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Bar 
                  dataKey="prompts" 
                  fill="#017a1e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Room Occupancy Chart */}
      <div className="bg-white rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-6 border border-gray-200 mb-6 sm:mb-8 min-w-0">
        <div className="flex items-center mb-4 sm:mb-6">
          <Building className="mr-2 sm:mr-3 flex-shrink-0" style={{ color: '#017a1e' }} size={20} />
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 truncate">Room Occupancy Analysis</h2>
        </div>
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roomOccupancyData} margin={{ top: 20, right: 5, left: 5, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis 
                dataKey="room" 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={{ stroke: '#e5e7eb' }}
                angle={-45}
                textAnchor="end"
                height={80}
                interval={0}
              />
              <YAxis 
                tick={{ fill: '#6b7280', fontSize: 10 }}
                axisLine={{ stroke: '#e5e7eb' }}
                width={40}
              />
              <Tooltip 
                formatter={(value, name) => [
                  `${value} people`, 
                  name === 'avgOccupancy' ? 'Average' : 'Peak'
                ]}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="avgOccupancy" 
                fill="#017a1e"
                name="Average Occupancy"
                radius={[2, 2, 0, 0]}
              />
              <Bar 
                dataKey="peakOccupancy" 
                fill="#059669"
                name="Peak Occupancy"
                radius={[2, 2, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-wrap justify-center gap-3 sm:gap-6 mt-4">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-[#017a1e] flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-600">Average Occupancy</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full mr-2 bg-[#059669] flex-shrink-0"></div>
            <span className="text-xs sm:text-sm text-gray-600">Peak Occupancy</span>
          </div>
        </div>
      </div>

      {/* Detailed Room Statistics */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="mr-3" style={{ color: '#017a1e' }} size={24} />
            <h2 className="text-xl font-bold text-gray-800">Room Statistics Overview</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Room</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Occupancy</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Peak Occupancy</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.rooms).map(([room, occupancy], index) => {
                  const utilization = occupancy.peakOccupancy > 0 
                    ? ((occupancy.avgOccupancy / occupancy.peakOccupancy) * 100).toFixed(1)
                    : 0;
                  
                  return (
                    <tr key={room} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-medium text-gray-800">{room}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{occupancy.avgOccupancy}</td>
                      <td className="py-3 px-4 text-right text-gray-600">{occupancy.peakOccupancy}</td>
                      <td className="py-3 px-4 text-right">
                        <span 
                          className="px-2 py-1 rounded-full text-xs font-medium"
                          style={{ 
                            backgroundColor: utilization > 80 ? '#dc2626' : utilization > 50 ? '#f59e0b' : '#017a1e',
                            color: 'white'
                          }}
                        >
                          {utilization}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium mb-1">System Health</p>
              <p className="text-2xl font-bold">Excellent</p>
              <p className="text-green-100 text-sm mt-1">100% login success</p>
            </div>
            <Shield size={32} className="text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm font-medium mb-1">Weekly Activity</p>
              <p className="text-2xl font-bold">{data.prompts.totalPrompts}</p>
              <p className="text-blue-100 text-sm mt-1">Total prompts</p>
            </div>
            <MessageSquare size={32} className="text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl shadow-lg p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm font-medium mb-1">Space Utilization</p>
              <p className="text-2xl font-bold">
                {Object.values(data.rooms).reduce((sum, room) => sum + room.avgOccupancy, 0)}
              </p>
              <p className="text-purple-100 text-sm mt-1">Total avg occupancy</p>
            </div>
            <Users size={32} className="text-purple-200" />
          </div>
        </div>
      </div>
    </div>
  );
};
