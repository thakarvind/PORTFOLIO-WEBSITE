import { motion } from "framer-motion";
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from "recharts";
import { ArrowUpRight } from "lucide-react";

const data = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 550 },
  { name: 'Thu', value: 450 },
  { name: 'Fri', value: 700 },
  { name: 'Sat', value: 650 },
  { name: 'Sun', value: 800 },
];

export function DashboardMock() {
  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden text-left flex flex-col md:flex-row h-[400px]">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-48 border-r border-white/10 p-4 bg-[#050505]">
        <div className="w-8 h-8 rounded bg-white mb-8" />
        <div className="space-y-1">
          {['Overview', 'Trips', 'Drivers', 'Revenue', 'Heatmap'].map((item, i) => (
            <div key={item} className={`px-3 py-2 rounded-md text-sm font-medium ${i === 0 ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'}`}>
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-sm font-medium text-gray-400 mb-1">Total Rides</p>
            <div className="flex items-baseline gap-3">
              <h4 className="text-3xl font-medium text-white tracking-tight">142,318</h4>
              <span className="flex items-center text-sm font-medium text-[#4ade80]">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                47.3%
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-300">7 Days</div>
            <div className="px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-300">NCR Region</div>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-[#0f0f0f] rounded-xl border border-white/5 p-4 flex flex-col">
          <p className="text-sm font-medium text-gray-400 mb-4">Demand Trend</p>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="name" stroke="#525252" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="value" stroke="#fff" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}