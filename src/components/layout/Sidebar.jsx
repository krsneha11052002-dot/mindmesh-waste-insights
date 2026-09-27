import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, ClipboardList, BarChart2, AlertCircle,
  Lightbulb, TrendingUp, Menu, X, ChevronRight, Leaf
} from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/survey', icon: ClipboardList, label: 'Student Survey' },
  { to: '/insights', icon: BarChart2, label: 'Campus Insights' },
  { to: '/barriers', icon: AlertCircle, label: 'Barrier Analysis' },
  { to: '/interventions', icon: Lightbulb, label: 'Interventions' },
  { to: '/impact', icon: TrendingUp, label: 'Impact' },
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-green-700 rounded-md flex items-center justify-center">
            <Leaf size={14} className="text-white" />
          </div>
          <span className="font-bold text-gray-900 text-base tracking-tight">MINDMESH</span>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="p-2 rounded-md hover:bg-gray-100 text-gray-600"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 h-full z-40 bg-white border-r border-gray-200
          flex flex-col w-56 transition-transform duration-200
          lg:translate-x-0 lg:static lg:z-auto
          ${open ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-gray-100">
          <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center shrink-0">
            <Leaf size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm tracking-wider leading-none">MINDMESH</div>
            <div className="text-[10px] text-gray-400 mt-0.5">IDEAForge 2026</div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="mb-2 px-2 text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Platform</div>
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg mb-0.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon size={16} />
              <span className="flex-1">{label}</span>
              {location.pathname === to && <ChevronRight size={12} className="text-green-500" />}
            </NavLink>
          ))}
        </nav>

        {/* Admin pill */}
        <div className="px-4 py-4 border-t border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs shrink-0">
              SA
            </div>
            <div className="min-w-0">
              <div className="text-xs font-semibold text-gray-800 truncate">Sustainability Admin</div>
              <div className="text-[10px] text-gray-400">Campus Co-ordinator</div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
