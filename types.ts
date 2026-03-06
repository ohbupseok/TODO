
export enum Category {
  All = '전체',
  Work = '업무',
  Personal = '개인',
  Study = '학습',
  Other = '기타',
}

export enum Priority {
  High = '높음',
  Normal = '보통',
  Low = '낮음',
}

export enum Status {
  Todo = '미완료',
  InProgress = '진행중',
  Done = '완료',
}

export enum TimerMode {
  Focus = 'Focus',
  ShortBreak = 'Short Break',
  LongBreak = 'Long Break',
}

export interface Task {
  id: number;
  title: string;
  category: Category;
  priority: Priority;
  estimatedTime: number; // in minutes
  actualTime: number; // in seconds
  status: Status;
  createdAt: Date;
  completedAt?: Date;
}
