import React from 'react';
import { TimerMode } from '../types';
import { Icon } from './Icon';

interface HeaderProps {
    time: number;
    timerMode: TimerMode;
    isActive: boolean;
    onToggleTimer: () => void;
    onChangeTimerMode: (mode: TimerMode) => void;
    onExport: (format: 'json' | 'csv') => void;
    onResetDay: () => void;
    onShowCategoryManager: () => void;
    onShowSettings: () => void;
    onShowAppInfo: () => void;
}

const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const TimerButton: React.FC<{ mode: TimerMode, currentMode: TimerMode, onClick: (mode: TimerMode) => void, children: React.ReactNode }> = ({ mode, currentMode, onClick, children }) => {
    const isActive = mode === currentMode;
    return (
        <button
            onClick={() => onClick(mode)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-md transition-colors ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-700 hover:bg-slate-600'}`}>
            {children}
        </button>
    );
};


export const Header: React.FC<HeaderProps> = ({ time, timerMode, isActive, onToggleTimer, onChangeTimerMode, onExport, onResetDay, onShowCategoryManager, onShowSettings, onShowAppInfo }) => {
    return (
        <header className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 flex items-center justify-between text-slate-300">
            <h1 className="text-xl font-bold text-white">✨ 오늘의 할 일 & 성과</h1>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-800 p-1 rounded-lg">
                    <TimerButton mode={TimerMode.Focus} currentMode={timerMode} onClick={onChangeTimerMode}>Focus</TimerButton>
                    <TimerButton mode={TimerMode.ShortBreak} currentMode={timerMode} onClick={onChangeTimerMode}>Short Break</TimerButton>
                    <TimerButton mode={TimerMode.LongBreak} currentMode={timerMode} onClick={onChangeTimerMode}>Long Break</TimerButton>
                </div>
                <span className="text-2xl font-mono font-bold text-white w-24 text-center">{formatTime(time)}</span>
                <button onClick={onToggleTimer} className="px-5 py-2 text-sm font-bold bg-white text-slate-900 rounded-md hover:bg-slate-200 transition-colors">
                    {isActive ? 'PAUSE' : 'START'}
                </button>
                 <button onClick={onShowSettings} className="p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors" title="타이머 설정">
                   <Icon icon="settings" className="w-5 h-5 text-slate-300" />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{getTodayDate()}</span>
                <button onClick={() => onExport('json')} className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">JSON</button>
                <button onClick={() => onExport('csv')} className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">CSV</button>
                <button onClick={onShowCategoryManager} className="px-3 py-1.5 text-xs font-semibold bg-slate-700 hover:bg-slate-600 rounded-md transition-colors">카테고리 관리</button>
                <button onClick={onResetDay} className="px-3 py-1.5 text-xs font-semibold bg-red-600/50 hover:bg-red-600/80 rounded-md transition-colors">하루 리셋</button>
                <button onClick={onShowAppInfo} className="p-2 bg-slate-700 rounded-md hover:bg-slate-600 transition-colors" title="앱 설명서">
                    <Icon icon="info" className="w-5 h-5 text-slate-300" />
                </button>
            </div>
        </header>
    );
};