
export enum View {
  DASHBOARD = 'dashboard',
  SCENARIOS = 'scenarios',
  POLISHING = 'polishing',
  TUTOR = 'tutor',
  LIVE = 'live'
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface PolishResult {
  original: string;
  polished: string;
  explanation: string;
  suggestions: string[];
}
