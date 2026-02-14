
import React from 'react';
import { SCENARIOS } from '../constants';
import { Scenario } from '../types';

interface ScenarioListProps {
  onSelect: (scenario: Scenario) => void;
}

const ScenarioList: React.FC<ScenarioListProps> = ({ onSelect }) => {
  const difficultyMap: Record<string, string> = {
    'Beginner': '初级',
    'Intermediate': '中级',
    'Advanced': '高级'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-slate-800">学习场景</h2>
          <p className="text-slate-500">选择一个真实世界的场景开始练习。</p>
        </div>
        <div className="flex space-x-2">
          {['全部', '初级', '中级', '高级'].map((lvl) => (
            <button key={lvl} className="px-3 py-1 text-sm rounded-full bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors">
              {lvl}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.id}
            onClick={() => onSelect(scenario)}
            className="group glass-effect rounded-2xl p-6 cursor-pointer hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="text-4xl w-14 h-14 bg-indigo-50 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all duration-300">
                <span className="group-hover:scale-125 transition-transform duration-300">
                  {scenario.icon}
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    scenario.difficulty === 'Beginner' ? 'bg-emerald-100 text-emerald-700' :
                    scenario.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-700' :
                    'bg-rose-100 text-rose-700'
                  }`}>
                    {difficultyMap[scenario.difficulty] || scenario.difficulty}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{scenario.category}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">{scenario.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{scenario.description}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center text-indigo-600 font-semibold text-sm group-hover:translate-x-2 transition-transform">
              <span>开始练习</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScenarioList;
