import React from 'react';
import { Task, Category, Status } from '../types';
import { TaskItem } from './TaskItem';

interface TaskListProps {
  tasks: Task[];
  activeFilter: Category;
  onFilterChange: (category: Category) => void;
  onTaskAction: (id: number, action: 'toggle' | 'delete' | 'start' | 'edit') => void;
  activeTaskId: number | null;
  categories: Category[];
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, activeFilter, onFilterChange, onTaskAction, activeTaskId, categories }) => {
  const inProgressTasks = tasks.filter(task => task.status === Status.InProgress || task.status === Status.Todo);
  const completedTasks = tasks.filter(task => task.status === Status.Done);

  const TABS = [Category.All, ...categories];

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col gap-4 h-full">
      <div>
        <div className="flex border-b border-slate-700 overflow-x-auto">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => onFilterChange(tab)}
              className={`px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${activeFilter === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-slate-400 hover:text-white'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto space-y-4 pr-2">
        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-slate-300">미완료/진행중</h2>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{inProgressTasks.length}개</span>
          </div>
          <div className="space-y-3">
            {inProgressTasks.map(task => <TaskItem key={task.id} task={task} onAction={onTaskAction} isActive={task.id === activeTaskId} />)}
          </div>
        </section>

        <section>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-bold text-slate-300">완료</h2>
            <span className="text-xs bg-slate-700 text-slate-300 px-2 py-0.5 rounded-full">{completedTasks.length}개</span>
          </div>
          <div className="space-y-3">
            {completedTasks.map(task => <TaskItem key={task.id} task={task} onAction={onTaskAction} isActive={false}/>)}
          </div>
        </section>
      </div>
    </div>
  );
};
