import React, { useState } from 'react';
import { Modal } from './Modal';
import { TimerMode } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (durations: Record<TimerMode, number>) => void;
  currentDurations: Record<TimerMode, number>;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentDurations }) => {
  const [durations, setDurations] = useState({
    [TimerMode.Focus]: Math.floor(currentDurations[TimerMode.Focus] / 60),
    [TimerMode.ShortBreak]: Math.floor(currentDurations[TimerMode.ShortBreak] / 60),
    [TimerMode.LongBreak]: Math.floor(currentDurations[TimerMode.LongBreak] / 60),
  });

  const handleChange = (mode: TimerMode, value: string) => {
    const minutes = parseInt(value, 10);
    if (!isNaN(minutes) && minutes >= 0) {
      setDurations(prev => ({ ...prev, [mode]: minutes }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      [TimerMode.Focus]: durations[TimerMode.Focus] * 60,
      [TimerMode.ShortBreak]: durations[TimerMode.ShortBreak] * 60,
      [TimerMode.LongBreak]: durations[TimerMode.LongBreak] * 60,
    });
  };
  
  const commonInputClasses = "w-full bg-slate-700 border border-slate-600 rounded-md p-2.5 text-sm text-white placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 transition";

  return (
    <Modal title="설정" isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="focus" className="block text-sm font-medium text-slate-300 mb-1">Focus (분)</label>
          <input
            type="number"
            id="focus"
            min="1"
            value={durations[TimerMode.Focus]}
            onChange={(e) => handleChange(TimerMode.Focus, e.target.value)}
            className={commonInputClasses}
          />
        </div>
        <div>
          <label htmlFor="shortBreak" className="block text-sm font-medium text-slate-300 mb-1">Short Break (분)</label>
          <input
            type="number"
            id="shortBreak"
            min="1"
            value={durations[TimerMode.ShortBreak]}
            onChange={(e) => handleChange(TimerMode.ShortBreak, e.target.value)}
            className={commonInputClasses}
          />
        </div>
        <div>
          <label htmlFor="longBreak" className="block text-sm font-medium text-slate-300 mb-1">Long Break (분)</label>
          <input
            type="number"
            id="longBreak"
            min="1"
            value={durations[TimerMode.LongBreak]}
            onChange={(e) => handleChange(TimerMode.LongBreak, e.target.value)}
            className={commonInputClasses}
          />
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
