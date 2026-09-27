import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, LineChart, Zap, TrendingUp, ArrowRight,
  AlertTriangle, Users, BarChart3, CheckCircle2, Leaf,
  ChevronRight, ClipboardList, MapPin, Lightbulb
} from 'lucide-react';

const liveStats = [
  { icon: ClipboardList, value: '40', label: 'Student responses', color: 'text-blue-600' },
  { icon: MapPin,        value: '5',  label: 'Campus locations',  color: 'text-orange-600' },
  { icon: AlertTriangle, value: '6',  label: 'Barriers identified', color: 'text-red-600' },
  { icon: Lightbulb,    value: '12', label: 'Interventions mapped', color: 'text-purple-600' },
];

const steps = [
  {
    id: 1,
    icon: Search,
    label: 'Collect',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    desc: 'Run anonymised student surveys to gather behavioural data on segregation habits across campus locations.'
  },
  {
    id: 2,
    icon: BarChart3,
    label: 'Understand',
    color: 'text-blue-700',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    desc: 'Analyse patterns to surface the real reasons behind non-compliance — infrastructure, knowledge, habit, or motivation.'
  },
  {
    id: 3,
    icon: AlertTriangle,
    label: 'Prioritize',
    color: 'text-orange-700',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    desc: 'Rank barriers by frequency and severity so the sustainability team knows where to act first for maximum impact.'
  },
  {
    id: 4,
    icon: Zap,
    label: 'Intervene',
    color: 'text-purple-700',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
    desc: 'Deploy evidence-based interventions — redesigned labels, bin repositioning, awareness campaigns, or habit nudges.'
  },
  {
    id: 5,
    icon: TrendingUp,
    label: 'Measure',
    color: 'text-green-700',
    bg: 'bg-green-50',
    border: 'border-green-200',
    desc: 'Re-survey to measure whether behaviour actually changed. Compare before/after metrics to assess real-world impact.'
  },
];

const whyItems = [
  { icon: Users, text: 'Students often want to comply but face invisible barriers.' },
  { icon: AlertTriangle, text: 'Infrastructure gaps and unclear labels undermine intent.' },
  { icon: LineChart, text: 'Without data, interventions are guesswork — and waste resources.' },
  { icon: CheckCircle2, text: 'Measuring change closes the loop and builds institutional memory.' },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-16 pb-12">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
            <Leaf size={18} className="text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-gray-900">MINDMESH</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.15] mb-6 max-w-3xl">
          Stop guessing why campus <br className="hidden sm:block" />
          <span className="text-green-700">waste segregation fails.</span>
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mb-8 leading-relaxed">
          MINDMESH helps campuses understand WHY students struggle with waste segregation, choose interventions based on evidence, and measure whether those interventions actually change behaviour.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => navigate('/survey')}
            className="flex items-center gap-2 px-6 py-3 bg-green-700 text-white rounded-lg font-semibold text-sm hover:bg-green-800 transition-colors shadow-sm"
          >
            Take Demo Survey <ArrowRight size={16} />
          </button>
          <button
            onClick={() => navigate('/insights')}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-lg font-semibold text-sm border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors"
          >
            View Campus Dashboard
          </button>
        </div>

        {/* Live stats strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {liveStats.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3 border border-gray-100">
              <Icon size={18} className={`${color} shrink-0`} />
              <div>
                <div className={`text-lg font-bold ${color}`}>{value}</div>
                <div className="text-[11px] text-gray-500 leading-tight">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Problem statement */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div>
            <div className="text-xs font-semibold uppercase tracking-widest text-orange-600 mb-3">The Problem</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Why do students skip waste segregation?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Most campuses have segregated bins. Most students know waste segregation is important.
              Yet compliance rates remain low — often below 40%. The reason is not apathy.
            </p>
            <p className="text-gray-600 text-sm leading-relaxed">
              The real barriers are hidden: inconveniently placed bins, labels nobody reads,
              categories nobody fully understands, and habits that override intent. You cannot
              solve what you have not measured.
            </p>
          </div>

          <div className="space-y-3">
            {whyItems.map(({ icon: Icon, text }, i) => (
              <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3">
                <Icon size={16} className="text-green-600 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-700">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* 5-Step Process */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-3">The Process</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">How MINDMESH works</h2>

        {/* Step flow */}
        <div className="grid sm:grid-cols-5 gap-0 mb-10 relative">
          {steps.map((step, i) => (
            <div key={step.id} className="flex sm:flex-col items-start sm:items-center gap-3 relative">
              {/* connector line */}
              {i < steps.length - 1 && (
                <div className="hidden sm:block absolute top-5 left-1/2 w-full h-px bg-gray-200 z-0" />
              )}
              <div className={`relative z-10 w-10 h-10 rounded-xl flex items-center justify-center border ${step.bg} ${step.border} shrink-0`}>
                <step.icon size={18} className={step.color} />
              </div>
              <div className="sm:text-center">
                <div className={`text-xs font-bold uppercase tracking-wider ${step.color} mb-1`}>
                  {String(step.id).padStart(2, '0')} {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-5 gap-4">
          {steps.map((step) => (
            <div key={step.id} className={`rounded-xl p-4 border ${step.bg} ${step.border}`}>
              <div className={`text-xs font-bold uppercase tracking-wider ${step.color} mb-2`}>
                {step.label}
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-4xl mx-auto px-6">
        <div className="border-t border-gray-100" />
      </div>

      {/* Behaviour change loop */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">The Loop</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">The behaviour-change loop</h2>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {[
              { label: 'Survey', sub: 'Collect data on barriers', color: 'border-green-400 bg-white' },
              { label: 'Analyse', sub: 'Find root causes', color: 'border-blue-400 bg-white' },
              { label: 'Intervene', sub: 'Deploy targeted fix', color: 'border-purple-400 bg-white' },
              { label: 'Re-survey', sub: 'Measure change', color: 'border-green-400 bg-white' },
            ].map((node, i, arr) => (
              <React.Fragment key={node.label}>
                <div className={`flex-1 rounded-xl border-2 ${node.color} px-4 py-4 text-center w-full`}>
                  <div className="font-bold text-gray-900 text-sm">{node.label}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{node.sub}</div>
                </div>
                {i < arr.length - 1 && (
                  <ChevronRight size={18} className="text-gray-300 shrink-0 rotate-90 sm:rotate-0" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-xs text-gray-500 text-center mt-5">
            Each cycle produces richer data. Over time, the campus builds evidence of what actually works — not just what sounds good.
          </p>
        </div>
      </section>

      {/* CTA footer */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <div className="bg-green-600 rounded-2xl px-6 sm:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <div className="font-bold text-white text-xl mb-1">Ready to get started?</div>
            <div className="text-green-100 text-sm">Students: take the 3-minute survey. Admins: view live insights.</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => navigate('/survey')}
              className="px-5 py-2.5 bg-white text-green-700 rounded-lg font-semibold text-sm hover:bg-green-50 transition-colors"
            >
              Take Survey
            </button>
            <button
              onClick={() => navigate('/insights')}
              className="px-5 py-2.5 bg-green-700 text-white rounded-lg font-semibold text-sm border border-green-500 hover:bg-green-800 transition-colors"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
