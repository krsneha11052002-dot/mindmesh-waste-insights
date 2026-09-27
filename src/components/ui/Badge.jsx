import React from 'react';

export function DemoBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-700 border border-amber-200 uppercase tracking-wide">
      Demo Data
    </span>
  );
}

export function SeverityBadge({ severity }) {
  const map = {
    critical: 'bg-red-50 text-red-700 border-red-200',
    high: 'bg-orange-50 text-orange-700 border-orange-200',
    medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    low: 'bg-gray-100 text-gray-600 border-gray-200',
  };
  const labels = { critical: 'Critical', high: 'High', medium: 'Medium', low: 'Low' };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-semibold uppercase tracking-wide ${map[severity] || map.low}`}>
      {labels[severity] || severity}
    </span>
  );
}

export function StatusBadge({ status }) {
  const map = {
    planned: 'bg-gray-100 text-gray-700 border-gray-200',
    running: 'bg-blue-50 text-blue-700 border-blue-200',
    completed: 'bg-green-50 text-green-700 border-green-200',
  };
  const labels = { planned: 'Planned', running: 'Running', completed: 'Completed' };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-medium ${map[status] || map.planned}`}>
      {labels[status] || status}
    </span>
  );
}
