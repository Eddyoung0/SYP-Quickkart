import React from 'react';
import {
  LayoutDashboard, ShoppingBag, BoxIcon, Tags,
  Truck, Star, X, Zap
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', key: 'dashboard' },
  { icon: ShoppingBag, label: 'Orders', key: 'orders' },
  { icon: BoxIcon, label: 'Products', key: 'products' },
  { icon: Tags, label: 'Categories', key: 'categories' },
  { icon: Truck, label: 'Delivery Tracking', key: 'delivery' },
  { icon: Star, label: 'Reviews', key: 'reviews' },
];

const Sidebar = ({ activeMenu, setActiveMenu, sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-[260px] bg-white border-r border-gray-100 flex flex-col justify-between z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0`}
      >
        {/* Top section */}
        <div className="px-5 pt-7">
          {/* Brand */}
          <div className="flex items-center justify-between mb-9">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-linear-to-br from-[#5B5FEF] to-[#7C7FFF] rounded-xl flex items-center justify-center text-white">
                <Zap size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">QuickCart</span>
            </div>
            <button
              className="md:hidden p-1 text-gray-400 hover:text-gray-600"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1">
            {menuItems.map(({ icon: Icon, label, key }) => (
              <button
                key={key}
                onClick={() => {
                  setActiveMenu(key);
                  setSidebarOpen(false);
                }}
                className={`flex items-center gap-3.5 px-4 py-[11px] rounded-[10px] text-[0.935rem] font-medium transition-all duration-200 w-full text-left ${
                  activeMenu === key
                    ? 'bg-[#5B5FEF] text-white shadow-[0_4px_14px_rgba(91,95,239,0.35)]'
                    : 'text-gray-500 hover:bg-[rgba(91,95,239,0.08)] hover:text-[#5B5FEF]'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
