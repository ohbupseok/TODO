import React, { useState } from 'react';
import { Task, Category, Priority } from '../types';
import { PRIORITIES } from '../constants';

interface AddTaskFormProps {
  onAddTask: (task: Omit<Task, 'id' | 'actualTime' | 'status' | 'createdAt'>) => void;
  categories: Category[];
}

export const AddTaskForm: React.FC<AddTaskFormProps> = ({ onAddTask, categories }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>(Category.Study);
  const [priority, setPriority] = useState<Priority>(Priority.Normal);
  const [estimatedTime, setEstimatedTime] = useState(30);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('제목을 입력해주세요.');
      return;
    }
    if (estimatedTime < 0) {
        alert('예상 시간은 0 이상이어야 합니다.');
        return;
    }
    onAddTask({ title, category, priority, estimatedTime });
    setTitle('');
    setCategory(Category.Study);
    setPriority(Priority.Normal);
    setEstimatedTime(30);
  };

  const commonInputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-2.5 text-sm text-white placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
      <h2 className="text-lg font-bold text-white mb-4">할 일 추가</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 보고서 초안 작성"
            className={commonInputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">카테고리</label>
          <select id="category" value={category} onChange={(e) => setCategory(e.target.value as Category)} className={commonInputClasses}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-1">우선순위</label>
                <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)} className={commonInputClasses}>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="time" className="block text-sm font-medium text-slate-300 mb-1">시간(분)</label>
                <input
                    type="number"
                    id="time"
                    value={estimatedTime}
                    min="0"
                    onChange={(e) => setEstimatedTime(Number(e.target.value))}
                    className={commonInputClasses}
                />
            </div>
        </div>
        <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md transition text-sm">
          + 추가
        </button>
      </form>
    </div>
  );
};
