import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Layout() {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto lg:overflow-y-auto flex flex-col">
        {/* Mobile spacer for top bar */}
        <div className="lg:hidden h-14 shrink-0" />
        
        {/* Global Demo Banner */}
        <div className="bg-amber-100/50 border-b border-amber-200 px-4 py-2 flex items-center justify-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <p className="text-xs font-medium text-amber-800">
            <strong>Demo Mode Active:</strong> Pre-loaded with 40 mock student responses. Data is stored locally.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
