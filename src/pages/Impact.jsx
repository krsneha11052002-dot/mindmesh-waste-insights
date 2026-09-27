import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Legend, ReferenceLine
} from 'recharts';
import { ArrowRight, TrendingUp, TrendingDown, CheckCircle2 } from 'lucide-react';
import { impactData, aggregateImpact } from '../data/impactData';

function MetricRow({ metric }) {
  const improved = metric.lowerIsBetter
    ? metric.after < metric.before
    : metric.after > metric.before;

  const delta = (metric.after - metric.before).toFixed(1);
  const sign = delta > 0 ? '+' : '';

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-start justify-between gap-4 mb-3">
        <div>
          <div className="text-xs font-semibold text-gray-800">{metric.name}</div>
          <div className="text-[11px] text-gray-400 mt-0.5">{metric.description}</div>
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold shrink-0 ${improved ? 'text-green-700' : 'text-red-600'}`}>
          {improved ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {sign}{delta}{metric.unit.replace('/ ', '')}
        </div>
      </div>

      {/* Before → After visual */}
      <div className="flex items-center gap-2 text-xs">
        <div className="flex-1 text-center py-2 rounded-lg bg-white border border-gray-200">
          <div className="font-bold text-gray-800 text-sm">{metric.before}{metric.unit}</div>
          <div className="text-[10px] text-gray-400 mt-0.5">Before</div>
        </div>
        <ArrowRight size={13} className="text-gray-300 shrink-0" />
        <div className="flex-1 text-center py-2 rounded-lg bg-green-50 border border-green-200 shadow-sm">
          <div className="font-bold text-green-800 text-sm">{metric.after}{metric.unit}</div>
          <div className="text-[10px] text-green-600 mt-0.5">After</div>
        </div>
      </div>
    </div>
  );
}

function ImpactSection({ data }) {
  const chartData = data.metrics.map(m => {
    // Normalize rating (out of 5) to percentage for a shared Y axis if needed, 
    // but better to just show raw values and let Recharts handle dual axes if we had them.
    // For simplicity in the demo, we'll graph them as is.
    return {
      name: m.name,
      Before: m.before,
      After: m.after,
      unit: m.unit
    };
  });

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-6 shadow-sm">
      {/* Header strip */}
      <div className="h-1 bg-green-700" />
      <div className="px-6 py-5 border-b border-gray-100 flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1">Targeted Barriers: {data.barrierLabel}</div>
          <h3 className="font-bold text-gray-900 text-lg">{data.interventionTitle}</h3>
        </div>
        <span className="text-[10px] font-semibold px-2 py-1 rounded bg-green-50 text-green-800 border border-green-200 self-start uppercase tracking-wider">
          Intervention Completed
        </span>
      </div>

      <div className="grid sm:grid-cols-[1fr_2fr] gap-0">
        {/* Intervention details */}
        <div className="p-6 border-b sm:border-b-0 sm:border-r border-gray-100 bg-gray-50/50">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Intervention Actions</div>
          <ul className="space-y-3">
            {data.interventionDetails.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        <div className="p-6">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Measurable Outcome</div>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {data.metrics.map(m => (
              <MetricRow key={m.name} metric={m} />
            ))}
          </div>

          <div className="text-xs font-semibold text-gray-600 mb-3 text-center">Impact Comparison</div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData} barSize={30} barGap={8}>
              <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#6b7280' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                cursor={{ fill: '#f3f4f6' }}
              />
              <Legend iconSize={10} wrapperStyle={{ fontSize: 12, paddingTop: '10px' }} />
              <Bar dataKey="Before" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="After" fill="#15803d" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default function Impact() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-1">Impact Measurement</div>
          <h1 className="text-2xl font-bold text-gray-900">Did the interventions work?</h1>
          <p className="text-sm text-gray-500 mt-1 max-w-xl">
            MINDMESH closes the loop by comparing baseline behavior with post-intervention data to measure real-world impact.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-300 uppercase tracking-wide">
          Illustrative Demo Data
        </span>
      </div>

      {/* How it works strip */}
      <div className="bg-white border border-gray-200 rounded-xl px-6 py-5 mb-8 flex items-center justify-between gap-6 overflow-x-auto shadow-sm">
        {['Run Baseline Survey', 'Analyze Barriers', 'Deploy Intervention', 'Measure Impact'].map((s, i, arr) => (
          <React.Fragment key={s}>
            <div className="shrink-0 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-50 text-green-700 border border-green-200 text-sm font-bold flex items-center justify-center">
                {i + 1}
              </div>
              <div className="text-sm text-gray-800 font-semibold whitespace-nowrap">{s}</div>
            </div>
            {i < arr.length - 1 && <ArrowRight size={20} className="text-gray-300 shrink-0" />}
          </React.Fragment>
        ))}
      </div>

      {/* Per-intervention sections */}
      {impactData.map(data => (
        <ImpactSection key={data.id} data={data} />
      ))}
    </div>
  );
}
