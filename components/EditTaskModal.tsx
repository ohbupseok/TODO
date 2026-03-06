import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Task, Category, Priority } from '../types';
import { PRIORITIES } from '../constants';

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task: Task;
  categories: Category[];
}

export const EditTaskModal: React.FC<EditTaskModalProps> = ({ isOpen, onClose, onSave, task, categories }) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  useEffect(() => {
    setEditedTask(task);
  }, [task]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: name === 'estimatedTime' ? Number(value) : value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(editedTask);
  };
  
  const commonInputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-2.5 text-sm text-white placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <Modal title="할 일 수정" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-300 mb-1">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedTask.title}
            onChange={handleChange}
            className={commonInputClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-300 mb-1">카테고리</label>
          <select id="category" name="category" value={editedTask.category} onChange={handleChange} className={commonInputClasses}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="priority" className="block text-sm font-medium text-slate-300 mb-1">우선순위</label>
                <select id="priority" name="priority" value={editedTask.priority} onChange={handleChange} className={commonInputClasses}>
                    {PRIORITIES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="estimatedTime" className="block text-sm font-medium text-slate-300 mb-1">시간(분)</label>
                <input
                    type="number"
                    id="estimatedTime"
                    name="estimatedTime"
                    value={editedTask.estimatedTime}
                    min="0"
                    onChange={handleChange}
                    className={commonInputClasses}
                />
            </div>
        </div>
        <div className="mt-6 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-md transition text-sm">
              취소
            </button>
            <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition text-sm">
              저장
            </button>
        </div>
      </form>
    </Modal>
  );
};
