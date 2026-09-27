import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Quote, Lightbulb, Sparkles, Loader2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { barrierData } from '../data/barrierData';
import { mockAIAnalysis } from '../data/aiAnalysisData';
import { SeverityBadge } from '../components/ui/Badge';
import { interventionsData } from '../data/interventionsData';

const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };

function BarrierCard({ barrier }) {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);
  const interventionCount = interventionsData.filter(i => i.barrierId === barrier.id).length;
  const barWidth = `${barrier.percentage}%`;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      {/* Top color strip */}
      <div className="h-1" style={{ backgroundColor: barrier.color }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-3 h-3 rounded-sm shrink-0 mt-0.5" style={{ backgroundColor: barrier.color }} />
            <div>
              <h3 className="font-semibold text-gray-900 text-sm leading-tight">{barrier.label}</h3>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-500">{barrier.count} responses</span>
                <span className="text-xs font-semibold" style={{ color: barrier.color }}>{barrier.percentage}% share</span>
              </div>
            </div>
          </div>
          <SeverityBadge severity={barrier.severity} />
        </div>

        {/* Share bar */}
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div className="h-full rounded-full transition-all" style={{ width: barWidth, backgroundColor: barrier.color }} />
        </div>

        {/* Explanation */}
        <p className="text-xs text-gray-600 leading-relaxed mb-4">{barrier.explanation}</p>

        {/* Affected locations */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {barrier.affectedLocations.map(loc => (
            <span key={loc} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              {loc}
            </span>
          ))}
        </div>

        {/* Toggle quotes */}
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-800 transition-colors"
        >
          {expanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
          {expanded ? 'Hide' : 'Show'} student quotes ({barrier.quotes.length})
        </button>

        {expanded && (
          <div className="mt-4 space-y-2.5">
            {barrier.quotes.map((q, i) => (
              <div key={i} className="flex gap-2 bg-gray-50 rounded-lg px-3 py-2.5">
                <Quote size={12} className="text-gray-300 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700 italic leading-relaxed">{q}</p>
              </div>
            ))}
          </div>
        )}

        {/* Interventions link */}
        {interventionCount > 0 && (
          <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-400">
              <span className="font-semibold text-gray-600">{interventionCount}</span> intervention{interventionCount > 1 ? 's' : ''} available for this barrier
            </span>
            <button
              onClick={() => navigate('/interventions')}
              className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              <Lightbulb size={12} style={{ color: barrier.color }} />
              View interventions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function AIAnalysisPanel() {
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('analyze') === 'true' && !result && !analyzing) {
      handleAnalyze();
    }
  }, [location]);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Simulate API delay
    setTimeout(() => {
      setResult(mockAIAnalysis);
      setAnalyzing(false);
    }, 2000);
  };

  if (!result && !analyzing) {
    return (
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6 text-center mb-10">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles size={24} className="text-purple-600" />
        </div>
        <h2 className="text-lg font-bold text-gray-900 mb-2">Uncover insights automatically</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-6">
          Let our AI prototype process open-text survey feedback to identify themes, extract insights, and recommend targeted interventions instantly.
        </p>
        <button
          onClick={handleAnalyze}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-purple-600 text-white rounded-lg font-medium text-sm hover:bg-purple-700 transition-all shadow-sm hover:shadow"
        >
          <Sparkles size={16} /> Analyze Feedback
        </button>
        <p className="text-[10px] text-gray-400 mt-4 uppercase tracking-wider font-semibold">AI Prototype Analysis • Demo Mode</p>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="bg-purple-50 border border-purple-100 rounded-2xl p-10 text-center mb-10 flex flex-col items-center justify-center">
        <Loader2 size={32} className="text-purple-600 animate-spin mb-4" />
        <h3 className="text-sm font-semibold text-gray-800">Processing 40 survey responses...</h3>
        <p className="text-xs text-gray-500 mt-2">Running natural language processing and theme extraction</p>
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-purple-600" />
          <h2 className="text-xl font-bold text-gray-900">AI Analysis Results</h2>
        </div>
        <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-1 rounded font-bold uppercase tracking-wider">
          AI Prototype
        </span>
      </div>

      <div className="bg-white border-2 border-purple-100 rounded-2xl p-6 mb-6 shadow-sm">
        <p className="text-sm text-gray-800 leading-relaxed font-medium">
          "{result.overallInsight}"
        </p>
      </div>

      <div className="space-y-6">
        {result.themes.map((theme, i) => (
          <div key={theme.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                  Theme {i + 1}: {theme.barrier}
                </h3>
                <div className="text-xs text-gray-500 mt-1 flex items-center gap-3">
                  <span>{theme.percentage}% of responses ({theme.responsesCount})</span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-green-600 font-medium">
                    <CheckCircle2 size={12} /> {theme.confidence}% confidence
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Priority:</span>
                <span className={`text-xs font-bold px-2 py-1 rounded border ${
                  theme.priorityScore.overall === 'HIGH' ? 'bg-red-50 text-red-700 border-red-200' :
                  theme.priorityScore.overall === 'MEDIUM' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                  'bg-yellow-50 text-yellow-700 border-yellow-200'
                }`}>
                  {theme.priorityScore.overall}
                </span>
              </div>
            </div>

            <div className="p-5 grid sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">AI-Generated Insight</div>
                <div className="bg-purple-50/50 rounded-lg p-4 border border-purple-100/50 mb-4">
                  <p className="text-sm text-gray-800 leading-relaxed">{theme.aiInsight}</p>
                </div>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Classification Reasoning</div>
                <p className="text-xs text-gray-600 leading-relaxed">{theme.reason}</p>
              </div>

              <div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Example Responses</div>
                <div className="space-y-2 mb-6">
                  {theme.examples.map((ex, idx) => (
                    <div key={idx} className="flex gap-2">
                      <Quote size={12} className="text-gray-300 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600 italic leading-relaxed">{ex}</p>
                    </div>
                  ))}
                </div>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">AI Recommendation</div>
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <Lightbulb size={16} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-800 font-medium leading-relaxed">{theme.recommendation}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50/50 px-5 py-3 border-t border-gray-100 text-[10px] text-gray-400 flex gap-4">
              <span>Calculation: Freq ({theme.priorityScore.frequency}) + Severity ({theme.priorityScore.severity}) + Locs ({theme.priorityScore.locations}) = {theme.priorityScore.overall}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BarrierAnalysis() {
  const [sortBy, setSortBy] = useState('frequency');

  const sorted = [...barrierData].sort((a, b) => {
    if (sortBy === 'frequency') return b.count - a.count;
    if (sortBy === 'severity') return severityOrder[a.severity] - severityOrder[b.severity];
    return 0;
  });

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-8 flex-wrap">
        <div>
          <div className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-1">Barrier Analysis</div>
          <h1 className="text-2xl font-bold text-gray-900">Why students don't segregate</h1>
          <p className="text-sm text-gray-500 mt-1">
            Identify root causes from structured and unstructured survey feedback.
          </p>
        </div>
      </div>

      <AIAnalysisPanel />

      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-900">Manual Breakdown</h2>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-500">Sort by:</span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="frequency">Frequency</option>
            <option value="severity">Severity</option>
          </select>
        </div>
      </div>

      {/* Summary table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8 shadow-sm">
        <div className="px-5 py-3 border-b border-gray-100 bg-gray-50">
          <div className="grid grid-cols-4 gap-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
            <span className="col-span-2">Barrier</span>
            <span className="text-right">Responses</span>
            <span className="text-right">Share</span>
          </div>
        </div>
        {sorted.map(b => (
          <div key={b.id} className="grid grid-cols-4 gap-2 px-5 py-3 border-b border-gray-50 last:border-0 items-center hover:bg-gray-50 transition-colors">
            <div className="col-span-2 flex items-center gap-2">
              <div className="w-2 h-2 rounded-sm" style={{ backgroundColor: b.color }} />
              <span className="text-xs font-medium text-gray-800">{b.label}</span>
              <SeverityBadge severity={b.severity} />
            </div>
            <span className="text-xs text-gray-600 text-right">{b.count}</span>
            <span className="text-xs font-semibold text-right" style={{ color: b.color }}>{b.percentage}%</span>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="space-y-4">
        {sorted.map(b => (
          <BarrierCard key={b.id} barrier={b} />
        ))}
      </div>
    </div>
  );
}
