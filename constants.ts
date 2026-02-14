
import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 'coffee-shop',
    title: '咖啡店点餐',
    description: '学习如何像当地人一样点你最喜欢的咖啡并进行个性化定制。',
    icon: '☕',
    difficulty: 'Beginner',
    category: '日常生活'
  },
  {
    id: 'job-interview',
    title: '科技公司面试',
    description: '练习回答现代科技岗位中常见的行为面试问题。',
    icon: '💼',
    difficulty: 'Advanced',
    category: '职场专业'
  },
  {
    id: 'airport-checkin',
    title: '机场值机',
    description: '在值机柜台自如沟通，处理行李问题。',
    icon: '✈️',
    difficulty: 'Intermediate',
    category: '旅行出行'
  },
  {
    id: 'doctor-visit',
    title: '看医生',
    description: '用英语描述你的症状并理解医生的建议。',
    icon: '🏥',
    difficulty: 'Intermediate',
    category: '医疗健康'
  },
  {
    id: 'making-friends',
    title: '社交活动',
    description: '掌握闲谈（Small Talk）的艺术，建立有意义的人际联系。',
    icon: '🤝',
    difficulty: 'Beginner',
    category: '社交生活'
  }
];
