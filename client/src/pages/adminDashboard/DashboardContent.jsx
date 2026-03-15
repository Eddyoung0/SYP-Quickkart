import React, { useState } from 'react';
import {
  ArrowUp, ArrowDown, ArrowRight, Clock, ChevronLeft,
  ChevronRight, MoreHorizontal
} from 'lucide-react';

// ===== KPI DATA =====
const kpiData = [];

// ===== CHART DATA =====
const salesData = [];

// ===== CATEGORIES =====
const categories = [];

// ===== ORDERS =====
const orders = [];

// ===== DELIVERIES =====
const deliveries = [];

// ===== CALENDAR COMPONENT =====
const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 2, 1));
  const eventDays = [10, 18, 24, 28];

  const monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const dayNames = ['S','M','T','W','T','F','S'];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthDays = new Date(year, month, 0).getDate();

  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

  const prevDays = Array.from({ length: firstDay }, (_, i) => prevMonthDays - firstDay + 1 + i);
  const currentDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const totalCells = prevDays.length + currentDays.length;
  const nextDays = Array.from({ length: 42 - totalCells }, (_, i) => i + 1);

  return (
    <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 p-5 transition">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[1.05rem] font-semibold">{monthNames[month]}, {year}</h3>
        <div className="flex gap-1.5">
          <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-gray-500 bg-[#F5F6FA] hover:bg-[#5B5FEF] hover:text-white transition">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="w-[30px] h-[30px] rounded-lg flex items-center justify-center text-gray-500 bg-[#F5F6FA] hover:bg-[#5B5FEF] hover:text-white transition">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-0.5 text-center">
        {dayNames.map((d, i) => (
          <div key={i} className="text-[0.72rem] font-semibold text-gray-500 uppercase py-1.5">{d}</div>
        ))}
        {prevDays.map((d, i) => (
          <div key={`p${i}`} className="py-2 text-[0.82rem] text-gray-300 rounded-lg">{d}</div>
        ))}
        {currentDays.map(d => (
          <div
            key={d}
            className={`py-2 text-[0.82rem] rounded-lg cursor-pointer font-medium transition-all relative
              ${isCurrentMonth && d === today.getDate() ? 'bg-[#5B5FEF] text-white font-bold' : 'hover:bg-[rgba(91,95,239,0.08)] hover:text-[#5B5FEF]'}
            `}
          >
            {d}
            {eventDays.includes(d) && (
              <span className="block w-1 h-1 rounded-full bg-[#FF8A65] mx-auto mt-0.5" />
            )}
          </div>
        ))}
        {nextDays.map((d, i) => (
          <div key={`n${i}`} className="py-2 text-[0.82rem] text-gray-300 rounded-lg">{d}</div>
        ))}
      </div>
    </div>
  );
};

// ===== BAR CHART COMPONENT =====
const BarChart = () => {
  const maxVal = 100;
  const colors = ['#5B5FEF', '#6BD3D1', '#FF8A65'];

  if (!salesData.length) {
    return (
      <div className="h-[220px] px-6 pb-6 pt-2 flex items-center justify-center text-sm text-gray-400">
        No sales data yet.
      </div>
    );
  }

  return (
    <div className="flex items-end gap-3 sm:gap-4 h-[220px] px-6 pb-6 pt-2">
      {salesData.map((data, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <div className="flex items-end gap-1 h-[180px]">
            {[data.daily, data.weekly, data.monthly].map((val, j) => (
              <div
                key={j}
                className="w-3.5 sm:w-[18px] rounded-t-md hover:opacity-75 transition-all cursor-pointer"
                style={{ height: `${(val / maxVal) * 180}px`, background: colors[j] }}
                title={`${['Daily Orders', 'Weekly Revenue', 'Monthly Sales'][j]}: ${val}`}
              />
            ))}
          </div>
          <span className="text-[0.72rem] text-gray-500 font-medium">{data.label}</span>
        </div>
      ))}
    </div>
  );
};

// ===== MAIN DASHBOARD CONTENT =====
const DashboardContent = () => {
  return (
    <main className="flex-1 p-4 sm:p-7 overflow-y-auto">
      {/* Page header */}
      <div className="mb-6">
        <h1 className="text-[1.6rem] font-bold tracking-tight">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Welcome back! Here's your store overview.</p>
      </div>

      {/* KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6">
        {kpiData.length ? (
          kpiData.map((kpi, i) => (
            <div key={i} className="bg-white rounded-[14px] p-[22px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] flex items-start gap-4 relative border border-transparent hover:border-gray-100 hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.iconBg} ${kpi.iconColor} shrink-0`}>
                <kpi.icon size={20} />
              </div>
              <div>
                <h2 className="text-[1.65rem] font-bold tracking-tight leading-tight">{kpi.value}</h2>
                <p className="text-[0.82rem] text-gray-500 mt-0.5">{kpi.label}</p>
              </div>
              <span className={`absolute top-[22px] right-[22px] text-[0.75rem] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                kpi.up ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-500'
              }`}>
                {kpi.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                {kpi.trend}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-[14px] p-6 text-center text-sm text-gray-400 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
            No KPI data yet.
          </div>
        )}
      </section>

      {/* Sales Chart + Calendar */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-5 mb-6">
        {/* Chart */}
        <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 transition">
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <h3 className="text-[1.05rem] font-semibold">Sales Overview</h3>
            <div className="flex items-center gap-3 text-[0.78rem] text-gray-500">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#5B5FEF] inline-block" /> Daily Orders</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#6BD3D1] inline-block" /> Weekly Revenue</span>
              <span className="hidden sm:flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#FF8A65] inline-block" /> Monthly Sales</span>
            </div>
          </div>
          <BarChart />
        </div>

        {/* Calendar */}
        <Calendar />
      </section>

      {/* Top Selling Categories */}
      <section className="mb-6">
        <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 transition">
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <h3 className="text-[1.05rem] font-semibold">Top Selling Categories</h3>
            <a href="#" className="text-[0.82rem] text-[#5B5FEF] font-medium flex items-center gap-1 hover:gap-2 transition-all">See All <ArrowRight size={14} /></a>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 px-6 pb-6">
            {categories.length ? (
              categories.map((cat, i) => (
                <div key={i} className="bg-[#F5F6FA] rounded-[10px] p-[18px] text-center hover:bg-[rgba(91,95,239,0.08)] hover:-translate-y-0.5 transition-all cursor-pointer">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center mx-auto mb-3 ${cat.iconBg} ${cat.iconColor}`}>
                    <cat.icon size={20} />
                  </div>
                  <h4 className="text-sm font-semibold mb-1">{cat.name}</h4>
                  <p className="text-[0.78rem] text-gray-500 mb-2">{cat.orders} orders</p>
                  <span className={`text-[0.72rem] font-semibold flex items-center justify-center gap-0.5 ${cat.up ? 'text-green-500' : 'text-red-500'}`}>
                    {cat.up ? <ArrowUp size={12} /> : <ArrowDown size={12} />} {cat.trend}
                  </span>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-sm text-gray-400 py-8">
                No category data yet.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Recent Orders + Delivery Activity */}
      <section className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-5">
        {/* Orders Table */}
        <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 transition">
          <div className="flex items-center justify-between px-6 pt-5 pb-4">
            <h3 className="text-[1.05rem] font-semibold">Recent Orders</h3>
            <a href="#" className="text-[0.82rem] text-[#5B5FEF] font-medium flex items-center gap-1 hover:gap-2 transition-all">View All <ArrowRight size={14} /></a>
          </div>
          <div className="overflow-x-auto px-6 pb-6">
            <table className="w-full border-collapse whitespace-nowrap">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Order ID</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Customer</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Items</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Value</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Status</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3">Delivery</th>
                  <th className="text-left text-[0.78rem] font-semibold text-gray-500 uppercase tracking-wider py-3 px-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.length ? (
                  orders.map((order, i) => (
                    <tr key={i} className="border-b border-gray-50 last:border-b-0 hover:bg-[#F5F6FA] transition">
                      <td className="py-3.5 px-3 text-sm font-semibold text-[#5B5FEF]">{order.id}</td>
                      <td className="py-3.5 px-3 text-sm">{order.customer}</td>
                      <td className="py-3.5 px-3 text-sm">{order.items}</td>
                      <td className="py-3.5 px-3 text-sm">{order.value}</td>
                      <td className="py-3.5 px-3">
                        <span className={`inline-block px-3.5 py-1 rounded-full text-[0.75rem] font-semibold ${order.statusClass}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 text-sm">{order.time}</td>
                      <td className="py-3.5 px-3">
                        <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#F5F6FA] hover:text-[#5B5FEF] transition">
                          <MoreHorizontal size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-8 px-3 text-center text-sm text-gray-400">
                      No orders yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delivery Activity */}
        <div className="bg-white rounded-[14px] shadow-[0_2px_12px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 transition">
          <div className="px-5 pt-5 pb-4">
            <h3 className="text-[1.05rem] font-semibold">Upcoming Deliveries</h3>
          </div>
          <div className="px-5 pb-5 flex flex-col gap-1.5">
            {deliveries.length ? (
              deliveries.map((d, i) => (
                <div key={i} className="flex items-center gap-3.5 p-3.5 rounded-[10px] hover:bg-[#F5F6FA] transition cursor-pointer">
                  <img
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(d.name)}&background=${d.color}&color=fff&size=40`}
                    alt={d.name}
                    className="w-[42px] h-[42px] rounded-xl object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <strong className="block text-[0.9rem] font-semibold">{d.name}</strong>
                    <span className="text-[0.78rem] text-gray-500">{d.area}</span>
                  </div>
                  <div className="text-[0.78rem] text-[#5B5FEF] font-medium flex items-center gap-1.5 whitespace-nowrap">
                    <Clock size={14} /> {d.time}
                  </div>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-sm text-gray-400">
                No deliveries yet.
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default DashboardContent;
