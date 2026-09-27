import React, { useState } from 'react';
import { Calendar, User, ArrowUpRight, ChevronDown, ChevronUp, StickyNote } from 'lucide-react';
import {
  interventionsData, statusOptions, statusConfig, effortConfig, impactConfig
} from '../data/interventionsData';
import { barrierData } from '../data/barrierData';

function InterventionCard({ item, status, onCycleStatus }) {
  const [notesOpen, setNotesOpen] = useState(false);
  const [note, setNote] = useState('');

  const sc = statusConfig[status];
  const ec = effortConfig[item.effort];
  const ic = impactConfig[item.impact];

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors">
      <div className="p-5">
        {/* Status toggle */}
        <div className="flex items-start justify-between mb-3">
          <button
            onClick={onCycleStatus}
            title="Click to cycle status"
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium cursor-pointer hover:opacity-75 transition-opacity ${sc.color}`}
          >
            {sc.label}
            <ArrowUpRight size={10} />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-gray-900 mb-2 leading-snug">{item.title}</h3>
        <p className="text-xs text-gray-600 leading-relaxed mb-4">{item.description}</p>

        {/* Meta row */}
        <div className="flex items-center gap-3 text-[11px] flex-wrap mb-3">
          <span className={`font-medium ${ec.color}`}>{ec.label}</span>
          <span className="text-gray-300">·</span>
          <span className={`font-medium ${ic.color}`}>{ic.label}</span>
          <span className="text-gray-300">·</span>
          <span className="flex items-center gap-1 text-gray-400">
            <User size={10} /> {item.owner}
          </span>
          <span className="flex items-center gap-1 text-gray-400 ml-auto">
            <Calendar size={10} /> {item.targetDate}
          </span>
        </div>

        {/* Notes toggle */}
        <button
          onClick={() => setNotesOpen(o => !o)}
          className="flex items-center gap-1.5 text-[11px] text-gray-400 hover:text-gray-700 transition-colors mt-1"
        >
          <StickyNote size={11} />
          {notesOpen ? 'Hide notes' : 'Add progress notes'}
          {notesOpen ? <ChevronUp size={11} /> : <ChevronDown size={11} />}
        </button>

        {notesOpen && (
          <div className="mt-3">
            <textarea
              rows={3}
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Log what's been done, who was involved, any blockers…"
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none bg-gray-50"
            />
            {note.trim() && (
              <div className="text-[10px] text-gray-400 mt-1 text-right">{note.length} chars · saved locally</div>
            )}
          </div>
        )}
      </div>

      {/* Status progress bar */}
      <div className="h-0.5 w-full bg-gray-100">
        <div
          className="h-full transition-all"
          style={{
            width: status === 'planned' ? '10%' : status === 'running' ? '55%' : '100%',
            backgroundColor: status === 'completed' ? '#16a34a' : status === 'running' ? '#2563eb' : '#d1d5db',
          }}
        />
      </div>
    </div>
  );
}

export default function Interventions() {
  const [statuses, setStatuses] = useState(() =>
    Object.fromEntries(interventionsData.map(i => [i.id, i.status]))
  );
  const [filterBarrier, setFilterBarrier] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const cycleStatus = (id) => {
    setStatuses(s => {
      const current = s[id];
      const next = statusOptions[(statusOptions.indexOf(current) + 1) % statusOptions.length];
      return { ...s, [id]: next };
    });
  };

  const grouped = barrierData
    .map(b => ({
      barrier: b,
      items: interventionsData.filter(i => i.barrierId === b.id),
    }))
    .filter(g => g.items.length > 0)
    .filter(g => filterBarrier === 'all' || g.barrier.id === filterBarrier)
    .map(g => ({
      ...g,
      items: g.items.filter(item => filterStatus === 'all' || statuses[item.id] === filterStatus),
    }))
    .filter(g => g.items.length > 0);

  const statusCounts = { planned: 0, running: 0, completed: 0 };
  Object.values(statuses).forEach(s => statusCounts[s]++);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold uppercase tracking-widest text-purple-600 mb-1">Interventions</div>
        <h1 className="text-2xl font-bold text-gray-900">Evidence-based actions</h1>
        <p className="text-sm text-gray-500 mt-1">
          Each intervention is matched to a surveyed barrier. Click the status badge to update progress.
        </p>
      </div>

      {/* Status summary + filters */}
      <div className="flex flex-wrap gap-3 mb-8 items-center">
        {statusOptions.map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(prev => prev === s ? 'all' : s)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
              filterStatus === s
                ? statusConfig[s].color + ' ring-2 ring-offset-1'
                : statusConfig[s].color + ' opacity-70 hover:opacity-100'
            }`}
          >
            <span className="font-bold text-base leading-none">{statusCounts[s]}</span>
            <span>{statusConfig[s].label}</span>
          </button>
        ))}

        <div className="flex items-center gap-2 ml-auto">
          <select
            value={filterBarrier}
            onChange={e => setFilterBarrier(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="all">All barriers</option>
            {barrierData.map(b => (
              <option key={b.id} value={b.id}>{b.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Groups */}
      {grouped.length === 0 && (
        <div className="text-center py-16 text-gray-400 text-sm">
          No interventions match the current filters.
        </div>
      )}

      {grouped.map(({ barrier, items }) => (
        <div key={barrier.id} className="mb-8">
          {/* Barrier header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: barrier.color }} />
            <h2 className="font-semibold text-gray-900 text-sm">{barrier.label}</h2>
            <span className="text-xs text-gray-400">· {barrier.percentage}% of survey responses</span>
            <div className="flex-1 border-t border-gray-200 ml-2" />
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {items.map(item => (
              <InterventionCard
                key={item.id}
                item={item}
                status={statuses[item.id]}
                onCycleStatus={() => cycleStatus(item.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
