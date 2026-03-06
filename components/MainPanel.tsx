import React from 'react';
import { Task, Category } from '../types';
import { AddTaskForm } from './AddTaskForm';
import { PerformanceSummary } from './PerformanceSummary';

interface MainPanelProps {
  onAddTask: (task: Omit<Task, 'id' | 'actualTime' | 'status' | 'createdAt'>) => void;
  tasks: Task[];
  categories: Category[];
}

export const MainPanel: React.FC<MainPanelProps> = ({ onAddTask, tasks, categories }) => {
  return (
    <div className="flex flex-col gap-4 h-full">
      <AddTaskForm onAddTask={onAddTask} categories={categories} />
      <PerformanceSummary tasks={tasks} />
    </div>
  );
};
