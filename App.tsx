
import React, { useState } from 'react';
import { View, Scenario } from './types';
import ScenarioList from './components/ScenarioList';
import PolishingTool from './components/PolishingTool';
import LiveTutor from './components/LiveTutor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.SCENARIOS);
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);

  const handleScenarioSelect = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setCurrentView(View.LIVE); // Switch to live tutor when scenario selected
  };

  const renderContent = () => {
    switch (currentView) {
      case View.SCENARIOS:
        return <ScenarioList onSelect={handleScenarioSelect} />;
      case View.POLISHING:
        return <PolishingTool />;
      case View.LIVE:
        return (
          <div className="space-y-6">
            {selectedScenario && (
              <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl">{selectedScenario.icon}</span>
                  <div>
                    <h4 className="font-bold text-indigo-900">当前目标: {selectedScenario.title}</h4>
                    <p className="text-indigo-700 text-sm">{selectedScenario.description}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedScenario(null)}
                  className="text-indigo-400 hover:text-indigo-600"
                >
                  清除目标
                </button>
              </div>
            )}
            <LiveTutor />
          </div>
        );
      default:
        return <ScenarioList onSelect={handleScenarioSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <nav className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-slate-200 p-4 md:sticky md:top-0 md:h-screen flex md:flex-col justify-between z-50">
        <div className="flex md:flex-col items-center md:items-stretch w-full">
          <div className="flex items-center space-x-2 md:mb-12 px-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800 hidden md:block">FluentGenie</span>
          </div>

          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 md:space-y-2 ml-auto md:ml-0">
            {[
              { id: View.SCENARIOS, label: '对话场景', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
              { id: View.POLISHING, label: '地道润色', icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z' },
              { id: View.LIVE, label: 'AI 外教', icon: 'M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all group ${
                  currentView === item.id 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'text-slate-500 hover:bg-slate-50'
                }`}
              >
                <svg className={`w-5 h-5 md:mr-3 ${currentView === item.id ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="hidden md:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="hidden md:block p-4 bg-slate-50 rounded-2xl">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
              学员
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">学习者</p>
              <p className="text-[10px] text-slate-400">中级 • 连续学习 12 天</p>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[65%]" />
          </div>
          <p className="text-[10px] mt-2 text-slate-500">还需 650 XP 升级</p>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        {renderContent()}
      </main>

      {/* Floating Polish Action (Mobile/Quick Access) */}
      <button 
        onClick={() => setCurrentView(View.POLISHING)}
        className="fixed bottom-6 right-6 md:bottom-12 md:right-12 w-16 h-16 bg-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-40 group"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        <span className="absolute right-20 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          快速润色 ✨
        </span>
      </button>
    </div>
  );
};

export default App;
