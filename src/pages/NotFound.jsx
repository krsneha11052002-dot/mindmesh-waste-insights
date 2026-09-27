import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">
      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-6">
        <Leaf size={22} className="text-white" />
      </div>
      <div className="text-6xl font-black text-gray-100 mb-2">404</div>
      <h1 className="text-xl font-bold text-gray-900 mb-2">Page not found</h1>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">
        The page you're looking for doesn't exist in this prototype.
      </p>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Home
      </button>
    </div>
  );
}
