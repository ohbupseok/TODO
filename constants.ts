import { Task, Category, Priority, Status, TimerMode } from './types';

export const CATEGORIES: Category[] = [Category.Work, Category.Personal, Category.Study, Category.Other];
export const PRIORITIES: Priority[] = [Priority.High, Priority.Normal, Priority.Low];

export const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: '보고서 작성',
    category: Category.Work,
    priority: Priority.High,
    estimatedTime: 60,
    actualTime: 25 * 60 + 12, // example: 25 minutes 12 seconds
    status: Status.InProgress,
    createdAt: new Date(),
  },
  {
    id: 2,
    title: '이메일 확인',
    category: Category.Work,
    priority: Priority.Normal,
    estimatedTime: 10,
    actualTime: 0,
    status: Status.Done,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 2)),
    completedAt: new Date(new Date().setHours(18)),
  },
  {
    id: 3,
    title: '영어 학원',
    category: Category.Study,
    priority: Priority.Normal,
    estimatedTime: 120,
    actualTime: 0,
    status: Status.Done,
    createdAt: new Date(new Date().setHours(new Date().getHours() - 3)),
    completedAt: new Date(new Date().setHours(18)),
  },
];

export const TIMER_DURATIONS: Record<TimerMode, number> = {
  [TimerMode.Focus]: 25 * 60,
  [TimerMode.ShortBreak]: 5 * 60,
  [TimerMode.LongBreak]: 15 * 60,
};
