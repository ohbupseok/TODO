import React from 'react';
import { Task, Priority, Status } from '../types';
import { Icon } from './Icon';

interface TaskItemProps {
  task: Task;
  onAction: (id: number, action: 'toggle' | 'delete' | 'start' | 'edit') => void;
  isActive: boolean;
}

const priorityColor: Record<Priority, string> = {
  [Priority.High]: 'bg-red-500/20 text-red-400 border border-red-500/30',
  [Priority.Normal]: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
  [Priority.Low]: 'bg-green-500/20 text-green-400 border border-green-500/30',
};

const categoryColor: Record<string, string> = {
  '업무': 'bg-sky-500/20 text-sky-400 border border-sky-500/30',
  '학습': 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
  '개인': 'bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/30',
  '기타': 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};

const statusColor: Record<Status, string> = {
    [Status.InProgress]: 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30',
    [Status.Done]: 'bg-teal-500/20 text-teal-400 border border-teal-500/30',
    [Status.Todo]: 'bg-gray-500/20 text-gray-400 border border-gray-500/30',
};


const formatActualTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export const TaskItem: React.FC<TaskItemProps> = ({ task, onAction, isActive }) => {
  const isCompleted = task.status === Status.Done;
  return (
    <div className={`bg-slate-800 p-4 rounded-lg border ${isActive ? 'border-indigo-500' : 'border-slate-700'} transition-colors`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`font-bold text-white ${isCompleted ? 'line-through text-slate-500' : ''}`}>{task.title}</h3>
          <p className="text-xs text-slate-400 mt-1">
            예상: {task.estimatedTime}분 &bull; 실제: {formatActualTime(task.actualTime)}
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          {!isCompleted ? (
            <>
                <button onClick={() => onAction(task.id, 'start')} className="hover:text-white transition-colors p-1" aria-label={isActive ? 'Pause task' : 'Start task'}><Icon icon={isActive ? 'pause':'play'} /></button>
                <button onClick={() => onAction(task.id, 'toggle')} className="hover:text-white transition-colors p-1" aria-label="Complete task"><Icon icon="check" /></button>
            </>
          ) : (
            <button onClick={() => onAction(task.id, 'toggle')} className="hover:text-white transition-colors p-1" aria-label="Mark task as not completed">
              <Icon icon="refresh" />
            </button>
          )}
          <button onClick={() => onAction(task.id, 'edit')} className="hover:text-white transition-colors p-1" aria-label="Edit task"><Icon icon="edit" /></button>
          <button onClick={() => onAction(task.id, 'delete')} className="hover:text-white transition-colors p-1" aria-label="Delete task"><Icon icon="delete" /></button>
        </div>
      </div>
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className={`text-xs px-2 py-0.5 rounded ${priorityColor[task.priority]}`}>우선순위: {task.priority}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${categoryColor[task.category] || categoryColor['기타']}`}>{task.category}</span>
        <span className={`text-xs px-2 py-0.5 rounded ${statusColor[task.status]}`}>{task.status}</span>
      </div>
    </div>
  );
};
