import React, { useEffect } from 'react';
import { PackageSearch, Clock3, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const YourOrders = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8f8f6] pt-24 pb-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl border border-neutral-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="bg-linear-to-r from-[#007E5D] to-[#03a679] px-6 py-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] opacity-80">Orders</p>
            <h1 className="mt-2 text-3xl font-semibold">Your Orders</h1>
            <p className="mt-2 text-sm opacity-90">Track your order status and recent activity.</p>
          </div>

          <div className="p-6 sm:p-8">
            <div className="rounded-xl border border-dashed border-neutral-300 bg-neutral-50 p-8 text-center">
              <PackageSearch size={34} className="mx-auto text-neutral-400" />
              <h2 className="mt-4 text-xl font-semibold text-neutral-900">No orders yet</h2>
              <p className="mt-2 text-sm text-neutral-600">
                You have not placed any orders yet. Start shopping and your orders will appear here.
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-neutral-600">
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
                  <Clock3 size={14} /> Processing updates
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
                  <Truck size={14} /> Delivery tracking
                </span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/product')}
                className="mt-7 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-700"
              >
                Browse Products
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourOrders;
