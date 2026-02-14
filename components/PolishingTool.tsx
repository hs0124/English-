
import React, { useState } from 'react';
import { polishEnglish } from '../services/geminiService';
import { PolishResult } from '../types';

const PolishingTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PolishResult | null>(null);

  const handlePolish = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const data = await polishEnglish(input);
      setResult(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-slate-800">地道表达润色</h2>
        <p className="text-slate-500">将你的英语句子转化为母语人士的自然表达方式。</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-6 space-y-4">
          <textarea
            className="w-full h-32 p-4 text-lg border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
            placeholder="在此输入你的英语句子..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={handlePolish}
            disabled={loading || !input.trim()}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-indigo-200 active:scale-[0.98]"
          >
            {loading ? '润色中...' : '开始润色 ✨'}
          </button>
        </div>

        {result && (
          <div className="border-t border-slate-100 p-8 space-y-6 bg-slate-50/50 animate-slideUp">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">原文 (Original)</span>
                <p className="text-slate-600 italic">"{result.original}"</p>
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-500">地道表达 (Polished)</span>
                <p className="text-lg font-medium text-slate-900">"{result.polished}"</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg border border-slate-200">
                <h4 className="font-semibold text-slate-800 mb-1">润色分析</h4>
                <p className="text-slate-600 leading-relaxed">{result.explanation}</p>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-semibold text-slate-500">学习笔记:</h4>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {result.suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PolishingTool;
