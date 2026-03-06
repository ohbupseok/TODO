import React, { useState } from 'react';
import { Modal } from './Modal';
import { Category, Task } from '../types';
import { Icon } from './Icon';

interface CategoryManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (categories: Category[]) => void;
  categories: Category[];
  tasks: Task[];
}

export const CategoryManagerModal: React.FC<CategoryManagerModalProps> = ({ isOpen, onClose, onSave, categories, tasks }) => {
  const [localCategories, setLocalCategories] = useState<Category[]>(categories);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory.trim() && !localCategories.includes(newCategory.trim() as Category)) {
      setLocalCategories([...localCategories, newCategory.trim() as Category]);
      setNewCategory('');
    } else {
        alert("카테고리가 비어있거나 이미 존재합니다.");
    }
  };

  const handleDeleteCategory = (categoryToDelete: Category) => {
    setLocalCategories(localCategories.filter(cat => cat !== categoryToDelete));
  };
  
  const isCategoryInUse = (category: Category): boolean => {
    return tasks.some(task => task.category === category);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(localCategories);
  };
  
  const commonInputClasses = "flex-grow bg-slate-700 border border-slate-600 rounded-md p-2.5 text-sm text-white placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <Modal title="카테고리 관리" isOpen={isOpen} onClose={onClose}>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">카테고리 목록</label>
                <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                    {localCategories.map(cat => (
                        <div key={cat} className="flex items-center justify-between bg-slate-700 p-2 rounded-md">
                            <span className="text-white">{cat}</span>
                            <button 
                                onClick={() => handleDeleteCategory(cat)}
                                disabled={isCategoryInUse(cat)}
                                className="text-slate-400 hover:text-red-500 disabled:text-slate-600 disabled:cursor-not-allowed transition"
                                title={isCategoryInUse(cat) ? "이 카테고리는 현재 사용 중이라 삭제할 수 없습니다." : "카테고리 삭제"}
                            >
                                <Icon icon="delete" className="w-5 h-5"/>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                 <label htmlFor="newCategory" className="block text-sm font-medium text-slate-300 mb-1">새 카테고리 추가</label>
                 <div className="flex gap-2">
                    <input
                        type="text"
                        id="newCategory"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        placeholder="예: 운동"
                        className={commonInputClasses}
                    />
                    <button type="button" onClick={handleAddCategory} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition text-sm">
                        추가
                    </button>
                 </div>
            </div>

             <div className="mt-6 flex justify-end">
                <button type="button" onClick={handleSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition text-sm">
                    닫기 및 저장
                </button>
            </div>
        </div>
    </Modal>
  );
};
