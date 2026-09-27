import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, Radar
} from 'recharts';
import { Users, TrendingUp, AlertCircle, MapPin, ChevronRight, Sparkles, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { barrierData, locationComparisonData } from '../data/barrierData';
import { mockSurveyResponses, getComplianceRate } from '../data/mockSurveyData';
import { mockAIAnalysis } from '../data/aiAnalysisData';
import { DemoBadge } from '../components/ui/Badge';

const recentFeedback = mockSurveyResponses.slice(-6).reverse().map(r => ({
  location: r.location,
  frequency: r.segregationFrequency,
  text: r.openEndedResponse,
}));

const frequencyColors = {
  always: '#16a34a',
  sometimes: '#2563eb',
  rarely: '#ea580c',
  never: '#dc2626',
};

const topIssues = [
  { issue: 'No segregated bins in sports area', mentions: 5 },
  { issue: 'Canteen has only one bin', mentions: 7 },
  { issue: 'Labels faded or too small to read', mentions: 8 },
  { issue: 'Unclear difference between "wet" and "compost"', mentions: 9 },
  { issue: 'Inconsistent bin availability across floors', mentions: 4 },
];

// Frequency distribution from mock data
const freqCounts = { always: 0, sometimes: 0, rarely: 0, never: 0 };
mockSurveyResponses.forEach(r => { freqCounts[r.segregationFrequency]++; });
const freqData = Object.entries(freqCounts).map(([k, v]) => ({
  name: k.charAt(0).toUpperCase() + k.slice(1),
  value: v,
  color: frequencyColors[k],
}));

// Radar data — avg response per barrier dimension (0–100 scale, higher = more barrier present)
const radarData = [
  { metric: 'Accessibility', score: 72 },
  { metric: 'Label clarity', score: 65 },
  { metric: 'Awareness', score: 48 },
  { metric: 'Habit', score: 61 },
  { metric: 'Motivation', score: 34 },
  { metric: 'Category clarity', score: 58 },
];

function StatCard({ icon: Icon, label, value, sub, color, trend }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={17} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-0.5 text-[11px] font-semibold ${trend > 0 ? 'text-green-600' : 'text-red-500'}`}>
            <TrendingUp size={12} className={trend < 0 ? 'rotate-180' : ''} />
            {trend > 0 ? '+' : ''}{trend}%
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-xs font-medium text-gray-800 mt-0.5">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 shadow-sm text-xs">
        <div className="font-semibold text-gray-800">{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.fill || p.color }}>
            {p.name}: {p.value}{typeof p.value === 'number' && p.name.toLowerCase().includes('rate') ? '%' : ''}
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function Insights() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('barriers'); // barriers | locations | frequency | radar
  const compliance = getComplianceRate();

  const barData = barrierData.map(b => ({ name: b.shortLabel, Responses: b.count, color: b.color }));
  const pieData = barrierData.map(b => ({ name: b.label, value: b.count, color: b.color }));
  const locData = locationComparisonData.map(l => ({
    name: l.location,
    'Compliance Rate': l.complianceRate,
  }));

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-1">Campus Insights</div>
          <h1 className="text-2xl font-bold text-gray-900">Sustainability Dashboard</h1>
          <p className="text-sm text-gray-500 mt-0.5">Based on 40 anonymised survey responses · Sept 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <DemoBadge />
          <button
            onClick={() => navigate('/barriers')}
            className="flex items-center gap-1.5 text-xs text-blue-600 font-medium hover:underline"
          >
            Full barrier analysis <ChevronRight size={12} />
          </button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Users}       label="Total Responses"    value="40"           sub="Sept 10–22, 2026"  color="bg-blue-600"   trend={null} />
        <StatCard icon={TrendingUp}  label="Compliance Rate"    value={`${compliance}%`} sub="Always + Sometimes" color="bg-green-600" trend={+8} />
        <StatCard icon={AlertCircle} label="Top Barrier"        value="Bin Access"   sub="31% of responses"  color="bg-orange-600" trend={null} />
        <StatCard icon={MapPin}      label="Locations Analysed" value="5"            sub="Campus-wide"        color="bg-purple-600" trend={null} />
      </div>

      {/* Chart tabs */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
        {/* Tab bar */}
        <div className="flex border-b border-gray-200 overflow-x-auto">
          {[
            { id: 'barriers',  label: 'Barrier frequency' },
            { id: 'locations', label: 'Location compliance' },
            { id: 'frequency', label: 'Segregation habits' },
            { id: 'radar',     label: 'Barrier radar' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-xs font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-700 bg-blue-50/30'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto px-4 py-3 flex items-center">
            <DemoBadge />
          </div>
        </div>

        <div className="p-5">
          {/* Barrier frequency */}
          {activeTab === 'barriers' && (
            <>
              <p className="text-xs text-gray-400 mb-4">How many student responses cite each barrier as a factor.</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={barData} barSize={30}>
                  <XAxis dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Responses" radius={[4, 4, 0, 0]}>
                    {barData.map((entry, i) => (
                      <Cell key={i} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Location compliance */}
          {activeTab === 'locations' && (
            <>
              <p className="text-xs text-gray-400 mb-4">% of students who segregate always or sometimes, per location.</p>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={locData} barSize={32} layout="vertical">
                  <XAxis type="number" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} domain={[0, 100]} unit="%" />
                  <YAxis type="category" dataKey="name" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Compliance Rate" radius={[0, 4, 4, 0]} fill="#16a34a" />
                </BarChart>
              </ResponsiveContainer>
            </>
          )}

          {/* Segregation frequency distribution */}
          {activeTab === 'frequency' && (
            <div className="grid sm:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-xs text-gray-400 mb-4">How often do students say they segregate waste?</p>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={freqData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      dataKey="value"
                      paddingAngle={3}
                    >
                      {freqData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {freqData.map(f => (
                  <div key={f.name}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-medium text-gray-700">{f.name}</span>
                      <span className="text-xs font-bold" style={{ color: f.color }}>
                        {f.value} ({Math.round((f.value / 40) * 100)}%)
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(f.value / 40) * 100}%`,
                          backgroundColor: f.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p className="text-[11px] text-gray-400 pt-1">
                  {Math.round(((freqCounts.never + freqCounts.rarely) / 40) * 100)}% of students segregate rarely or never.
                </p>
              </div>
            </div>
          )}

          {/* Radar chart */}
          {activeTab === 'radar' && (
            <>
              <p className="text-xs text-gray-400 mb-4">Barrier severity score across dimensions (0 = no barrier, 100 = maximum barrier). Higher = worse.</p>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11, fill: '#6b7280' }} />
                  <Radar
                    name="Barrier score"
                    dataKey="score"
                    stroke="#ea580c"
                    fill="#ea580c"
                    fillOpacity={0.15}
                    strokeWidth={2}
                  />
                  <Tooltip
                    contentStyle={{ fontSize: 11, borderRadius: 8, border: '1px solid #e5e7eb' }}
                    formatter={(v) => [`${v}/100`, 'Severity']}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </>
          )}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="px-5 py-4 border-b border-purple-100/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-purple-600" />
            <h2 className="text-sm font-bold text-gray-900">AI Quick Insights</h2>
          </div>
          <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold uppercase tracking-wider">
            Prototype
          </span>
        </div>
        <div className="p-5">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="text-xs font-bold text-purple-600 uppercase tracking-wider mb-2">Top Detected Barrier</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{mockAIAnalysis.themes[0].barrier}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                  Priority: {mockAIAnalysis.themes[0].priorityScore.overall}
                </span>
                <span className="text-[10px] text-gray-500">{mockAIAnalysis.themes[0].responsesCount} responses affected</span>
              </div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1 mt-4">Why it matters</div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {mockAIAnalysis.themes[0].aiInsight}
              </p>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Affected Locations</div>
              <p className="text-xs text-gray-600">Main Block, Canteen, Sports Complex</p>
            </div>
            
            <div>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Example Feedback</div>
              <div className="bg-white rounded-lg p-3 border border-gray-100 mb-4 shadow-sm">
                <p className="text-xs text-gray-600 italic">"{mockAIAnalysis.themes[0].examples[0]}"</p>
              </div>
              
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Intervention</div>
              <div className="bg-amber-50 rounded-lg p-4 border border-amber-100 flex items-start gap-3">
                <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-800 font-medium leading-relaxed">
                  {mockAIAnalysis.themes[0].recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution donut + bottom cards */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {/* Donut */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm font-semibold text-gray-900 mb-1">Barrier distribution</div>
          <div className="text-xs text-gray-400 mb-3">Share of total responses</div>
          <ResponsiveContainer width="100%" height={130}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={35} outerRadius={58} dataKey="value" paddingAngle={2}>
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-2 space-y-1">
            {barrierData.slice(0, 5).map(b => (
              <div key={b.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: b.color }} />
                <span className="text-xs text-gray-600 truncate flex-1">{b.shortLabel}</span>
                <span className="text-xs font-semibold text-gray-700">{b.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent feedback */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm font-semibold text-gray-900 mb-4">Recent feedback</div>
          <div className="space-y-3">
            {recentFeedback.slice(0, 4).map((r, i) => (
              <div key={i} className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500 shrink-0">
                  {String.fromCharCode(65 + i)}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] text-gray-400">{r.location}</span>
                    <span
                      className="text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: frequencyColors[r.frequency] + '20', color: frequencyColors[r.frequency] }}
                    >
                      {r.frequency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 leading-relaxed line-clamp-2">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top issues */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <div className="text-sm font-semibold text-gray-900 mb-4">Top recurring issues</div>
          <div className="space-y-3">
            {topIssues.map(({ issue, mentions }) => (
              <div key={issue}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-700 leading-tight">{issue}</span>
                  <span className="text-xs font-bold text-gray-800 ml-2 shrink-0">{mentions}</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-orange-400"
                    style={{ width: `${(mentions / 10) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action row */}
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: 'Deep dive into barriers', desc: 'See all 6 with quotes & severity', to: '/barriers', color: 'text-orange-600 border-orange-200 hover:bg-orange-50' },
          { label: 'View interventions', desc: '12 actions mapped to barriers', to: '/interventions', color: 'text-purple-600 border-purple-200 hover:bg-purple-50' },
          { label: 'Measure impact', desc: 'Before/after metrics comparison', to: '/impact', color: 'text-green-600 border-green-200 hover:bg-green-50' },
        ].map(({ label, desc, to, color }) => (
          <button
            key={to}
            onClick={() => navigate(to)}
            className={`text-left px-4 py-4 rounded-xl border bg-white transition-colors ${color}`}
          >
            <div className="text-sm font-semibold mb-0.5">{label}</div>
            <div className="text-xs text-gray-400">{desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
