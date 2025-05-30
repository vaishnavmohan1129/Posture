import React from "react";
import {
  BsGrid1X2Fill,
  BsFillGrid3X3GapFill,
  BsFillBellFill,
} from "react-icons/bs";
import { FaExclamationTriangle, FaLightbulb } from "react-icons/fa";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Home = () => {
  const data = [
    { name: "Mon", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Tue", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Wed", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Thu", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Fri", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Sat", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Sun", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <main className="p-8 bg-gray-50 text-gray-900 min-h-screen">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">
          Welcome to the Posture Detection App
        </h1>
        <p className="text-lg text-gray-600">
          Monitor your posture and receive real-time recommendations.
        </p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        {/* Posture Checks */}
        <div className="bg-blue-100 text-blue-900 rounded-xl shadow p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[70%]">
              Posture Checks
            </h3>
            <BsGrid1X2Fill className="text-3xl text-blue-600 flex-shrink-0" />
          </div>
          <p className="text-4xl font-bold leading-none">300</p>
        </div>

        {/* Alerts */}
        <div className="bg-red-100 text-red-900 rounded-xl shadow p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[70%]">Alerts</h3>
            <FaExclamationTriangle className="text-3xl text-red-500 flex-shrink-0" />
          </div>
          <p className="text-4xl font-bold leading-none">12</p>
        </div>

        {/* Suggestions */}
        <div className="bg-green-100 text-green-900 rounded-xl shadow p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[70%]">
              Suggestions
            </h3>
            <FaLightbulb className="text-3xl text-green-500 flex-shrink-0" />
          </div>
          <p className="text-4xl font-bold leading-none">33</p>
        </div>

        {/* Notifications */}
        <div className="bg-yellow-100 text-yellow-900 rounded-xl shadow p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[70%]">
              Notifications
            </h3>
            <BsFillBellFill className="text-3xl text-yellow-500 flex-shrink-0" />
          </div>
          <p className="text-4xl font-bold leading-none">42</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-8">
        {/* Bar Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Weekly Performance (Bar Chart)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Legend />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Weekly Performance (Line Chart)
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={data}
              margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#718096" />
              <YAxis stroke="#718096" />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="pv"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
};

export default Home;
