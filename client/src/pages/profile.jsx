import React, { useEffect, useMemo } from 'react';
import { Mail, User, CalendarDays, ShieldCheck } from 'lucide-react';

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const userInfo = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('user')) || {};
    } catch {
      return {};
    }
  }, []);

  const fullName = userInfo.name || userInfo.fullName || 'QuickKart User';
  const email = userInfo.email || 'No email available';
  const role = userInfo.role || 'Customer';

  return (
    <div className="min-h-screen bg-[#f8f8f6] pt-24 pb-14">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-10">
        <div className="rounded-2xl bg-white border border-neutral-200 shadow-[0_8px_24px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="bg-linear-to-r from-[#007E5D] to-[#03a679] px-6 py-8 text-white">
            <p className="text-xs uppercase tracking-[0.2em] opacity-80">Account</p>
            <h1 className="mt-2 text-3xl font-semibold">My Profile</h1>
            <p className="mt-2 text-sm opacity-90">Manage your account information and view your details.</p>
          </div>

          <div className="p-6 sm:p-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Full Name</p>
              <p className="mt-2 text-base font-medium text-neutral-900 inline-flex items-center gap-2">
                <User size={16} /> {fullName}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Email</p>
              <p className="mt-2 text-base font-medium text-neutral-900 inline-flex items-center gap-2 break-all">
                <Mail size={16} /> {email}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Role</p>
              <p className="mt-2 text-base font-medium text-neutral-900 inline-flex items-center gap-2">
                <ShieldCheck size={16} /> {role}
              </p>
            </div>

            <div className="rounded-xl border border-neutral-200 p-4 bg-neutral-50">
              <p className="text-xs text-neutral-500 uppercase tracking-wide">Joined</p>
              <p className="mt-2 text-base font-medium text-neutral-900 inline-flex items-center gap-2">
                <CalendarDays size={16} /> Active member
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
