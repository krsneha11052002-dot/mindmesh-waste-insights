import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react';
import { locationList, segregationFrequencyOptions } from '../data/mockSurveyData';

const TOTAL_STEPS = 5;

const initialForm = {
  location: '',
  segregationFrequency: '',
  binsEasyToFind: null,
  labelsAreClear: null,
  categoriesEasyToUnderstand: null,
  distanceIssue: null,
  hasKnowledge: null,
  habitAffects: null,
  thinkItIsImportant: null,
  openEndedResponse: '',
};

function YesNoField({ label, value, onChange, required }) {
  return (
    <div>
      <div className="text-sm font-medium text-gray-800 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </div>
      <div className="flex gap-3">
        {[{ v: true, l: 'Yes' }, { v: false, l: 'No' }].map(({ v, l }) => (
          <button
            key={l}
            type="button"
            onClick={() => onChange(v)}
            className={`px-5 py-2 rounded-lg border text-sm font-medium transition-all ${
              value === v
                ? 'bg-green-600 border-green-600 text-white'
                : 'border-gray-200 text-gray-700 hover:border-gray-400 bg-white'
            }`}
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

function StepDots({ current, total }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all ${
            i < current ? 'bg-green-600' : i === current ? 'bg-green-600 w-6' : 'bg-gray-200'
          } ${i === current ? 'w-6' : 'w-3'}`}
        />
      ))}
    </div>
  );
}

export default function Survey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.location) e.location = 'Please select your campus location.';
      if (!form.segregationFrequency) e.segregationFrequency = 'Please select an option.';
    }
    if (step === 1) {
      if (form.binsEasyToFind === null) e.binsEasyToFind = 'Required.';
      if (form.labelsAreClear === null) e.labelsAreClear = 'Required.';
      if (form.categoriesEasyToUnderstand === null) e.categoriesEasyToUnderstand = 'Required.';
    }
    if (step === 2) {
      if (form.distanceIssue === null) e.distanceIssue = 'Required.';
      if (form.hasKnowledge === null) e.hasKnowledge = 'Required.';
    }
    if (step === 3) {
      if (form.habitAffects === null) e.habitAffects = 'Required.';
      if (form.thinkItIsImportant === null) e.thinkItIsImportant = 'Required.';
    }
    if (step === 4) {
      if (!form.openEndedResponse.trim()) e.openEndedResponse = 'Please write a response.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep()) {
      if (step < TOTAL_STEPS - 1) setStep(s => s + 1);
      else handleSubmit();
    }
  };

  const handleSubmit = () => setSubmitted(true);

  const freqLabel = segregationFrequencyOptions.find(o => o.value === form.segregationFrequency)?.label;

// Derive which barrier best matches this student's answers
function inferBarrier(f) {
  if (f.distanceIssue === true && f.binsEasyToFind === false)
    return { label: 'Bin Accessibility', color: '#ea580c', tip: 'The nearest segregated bin may be too far from where you spend your time. Infrastructure fixes like bin repositioning can help.' };
  if (f.labelsAreClear === false || f.categoriesEasyToUnderstand === false)
    return { label: 'Confusing Labels', color: '#2563eb', tip: 'You find it hard to tell which bin is right. Clearer icon-based labels with example items would likely help you.' };
  if (f.hasKnowledge === false)
    return { label: 'Lack of Awareness', color: '#16a34a', tip: 'You haven\'t had enough information about what goes in each bin. A short orientation guide or visual examples near bins would help.' };
  if (f.habitAffects === true)
    return { label: 'Habit / Inertia', color: '#7c3aed', tip: 'You know what to do but don\'t always act on it. Gentle nudge reminders at the point of disposal tend to be most effective.' };
  if (f.thinkItIsImportant === false)
    return { label: 'Lack of Motivation', color: '#db2777', tip: 'You don\'t currently see a strong reason to segregate. Visible impact metrics — like how much waste was diverted — can help build that motivation.' };
  return { label: 'Mixed factors', color: '#94a3b8', tip: 'Your responses suggest several factors may be at play. The dashboard will aggregate your input with others to find the clearest pattern.' };
}


  const summaryRows = [
    { label: 'Location', value: form.location },
    { label: 'Segregation frequency', value: freqLabel },
    { label: 'Bins easy to find', value: form.binsEasyToFind ? 'Yes' : 'No' },
    { label: 'Labels are clear', value: form.labelsAreClear ? 'Yes' : 'No' },
    { label: 'Categories easy to understand', value: form.categoriesEasyToUnderstand ? 'Yes' : 'No' },
    { label: 'Distance/convenience is a problem', value: form.distanceIssue ? 'Yes' : 'No' },
    { label: 'Has sufficient knowledge', value: form.hasKnowledge ? 'Yes' : 'No' },
    { label: 'Habit affects behaviour', value: form.habitAffects ? 'Yes' : 'No' },
    { label: 'Thinks segregation is important', value: form.thinkItIsImportant ? 'Yes' : 'No' },
    { label: 'Open response', value: form.openEndedResponse },
  ];

  if (submitted) {
    const barrier = inferBarrier(form);
    return (
      <div className="min-h-screen bg-white flex items-start justify-center pt-16 px-6">
        <div className="max-w-xl w-full">
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-50 border-2 border-green-200 mb-6 mx-auto">
            <CheckCircle2 size={28} className="text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Response recorded</h1>
          <p className="text-gray-500 text-sm text-center mb-8">
            Thank you for contributing to campus sustainability research. Your response is anonymised.
          </p>

          {/* Barrier insight */}
          <div className="rounded-xl border-2 mb-6 overflow-hidden" style={{ borderColor: barrier.color + '40' }}>
            <div className="px-4 py-2 flex items-center gap-2" style={{ backgroundColor: barrier.color + '12' }}>
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: barrier.color }} />
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: barrier.color }}>
                Your likely barrier: {barrier.label}
              </span>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-gray-700 leading-relaxed">{barrier.tip}</p>
            </div>
          </div>

          <div className="border border-gray-200 rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Your response summary</div>
            </div>
            <div className="divide-y divide-gray-100">
              {summaryRows.map(({ label, value }) => (
                <div key={label} className="flex justify-between gap-4 px-4 py-3">
                  <span className="text-xs text-gray-500 shrink-0">{label}</span>
                  <span className="text-xs font-medium text-gray-800 text-right">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate('/barriers?analyze=true')}
              className="w-full py-3 bg-purple-600 text-white text-sm font-semibold rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles size={16} />
              Run Campus AI Analysis
            </button>
            <button
              onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); }}
              className="w-full py-2.5 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Submit another response
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto px-6 pt-12 pb-16">
        {/* Header */}
        <div className="mb-8">
          <div className="text-xs font-semibold uppercase tracking-widest text-green-600 mb-2">Student Survey</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Waste Segregation Habits</h1>
          <p className="text-sm text-gray-500">Anonymised · 3 minutes · Helps improve your campus environment</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <StepDots current={step} total={TOTAL_STEPS} />
            <span className="text-xs text-gray-400">Step {step + 1} of {TOTAL_STEPS}</span>
          </div>
        </div>

        {/* Step 0: Location & Frequency */}
        {step === 0 && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-gray-900">About you</h2>

            <div>
              <label className="text-sm font-medium text-gray-800 block mb-2">
                Your primary campus location <span className="text-red-500">*</span>
              </label>
              <select
                value={form.location}
                onChange={e => set('location', e.target.value)}
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="">Select location…</option>
                {locationList.map(l => <option key={l} value={l}>{l}</option>)}
              </select>
              {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-800 block mb-2">
                How often do you separate your waste into different bins? <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                {segregationFrequencyOptions.map(opt => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => set('segregationFrequency', opt.value)}
                    className={`py-2.5 rounded-lg border text-sm font-medium transition-all ${
                      form.segregationFrequency === opt.value
                        ? 'bg-green-600 border-green-600 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              {errors.segregationFrequency && <p className="text-xs text-red-500 mt-1">{errors.segregationFrequency}</p>}
            </div>
          </div>
        )}

        {/* Step 1: Bin & label usability */}
        {step === 1 && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-gray-900">Bins &amp; Labels</h2>

            <YesNoField
              label="Are the segregated bins easy to find in your area?"
              value={form.binsEasyToFind}
              onChange={v => set('binsEasyToFind', v)}
              required
            />
            {errors.binsEasyToFind && <p className="text-xs text-red-500 -mt-4">{errors.binsEasyToFind}</p>}

            <YesNoField
              label="Are the labels on the bins clear and easy to read?"
              value={form.labelsAreClear}
              onChange={v => set('labelsAreClear', v)}
              required
            />
            {errors.labelsAreClear && <p className="text-xs text-red-500 -mt-4">{errors.labelsAreClear}</p>}

            <YesNoField
              label="Do you find the waste categories (e.g. wet, dry, hazardous) easy to understand?"
              value={form.categoriesEasyToUnderstand}
              onChange={v => set('categoriesEasyToUnderstand', v)}
              required
            />
            {errors.categoriesEasyToUnderstand && <p className="text-xs text-red-500 -mt-4">{errors.categoriesEasyToUnderstand}</p>}
          </div>
        )}

        {/* Step 2: Convenience & Knowledge */}
        {step === 2 && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-gray-900">Convenience &amp; Knowledge</h2>

            <YesNoField
              label="Is distance or convenience a reason you sometimes skip segregating waste?"
              value={form.distanceIssue}
              onChange={v => set('distanceIssue', v)}
              required
            />
            {errors.distanceIssue && <p className="text-xs text-red-500 -mt-4">{errors.distanceIssue}</p>}

            <YesNoField
              label="Do you feel you have enough knowledge about what goes in each bin?"
              value={form.hasKnowledge}
              onChange={v => set('hasKnowledge', v)}
              required
            />
            {errors.hasKnowledge && <p className="text-xs text-red-500 -mt-4">{errors.hasKnowledge}</p>}
          </div>
        )}

        {/* Step 3: Habit & Values */}
        {step === 3 && (
          <div className="space-y-6">
            <h2 className="text-base font-semibold text-gray-900">Habit &amp; Values</h2>

            <YesNoField
              label="Does time pressure or habit affect whether you segregate waste?"
              value={form.habitAffects}
              onChange={v => set('habitAffects', v)}
              required
            />
            {errors.habitAffects && <p className="text-xs text-red-500 -mt-4">{errors.habitAffects}</p>}

            <YesNoField
              label="Do you personally think waste segregation is important?"
              value={form.thinkItIsImportant}
              onChange={v => set('thinkItIsImportant', v)}
              required
            />
            {errors.thinkItIsImportant && <p className="text-xs text-red-500 -mt-4">{errors.thinkItIsImportant}</p>}
          </div>
        )}

        {/* Step 4: Open-ended */}
        {step === 4 && (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900">In your own words</h2>
            <p className="text-sm text-gray-500">
              This is the most important question. Be as honest as you like — all responses are anonymous.
            </p>
            <div>
              <label className="text-sm font-medium text-gray-800 block mb-2">
                What is the biggest reason you sometimes do not segregate your waste correctly?{' '}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                value={form.openEndedResponse}
                onChange={e => set('openEndedResponse', e.target.value)}
                placeholder="E.g. I can't find the right bin near the canteen, or I'm never sure which category applies…"
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
              />
              {errors.openEndedResponse && <p className="text-xs text-red-500 mt-1">{errors.openEndedResponse}</p>}
              <div className="text-right text-xs text-gray-400 mt-1">{form.openEndedResponse.length} characters</div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setStep(s => Math.max(0, s - 1))}
            disabled={step === 0}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={15} /> Back
          </button>
          <button
            type="button"
            onClick={next}
            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            {step === TOTAL_STEPS - 1 ? 'Submit' : 'Next'}
            {step < TOTAL_STEPS - 1 && <ChevronRight size={15} />}
          </button>
        </div>
      </div>
    </div>
  );
}
