
import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Task, Status } from '../types';

interface AnalysisPanelProps {
  tasks: Task[];
  note: string;
  onNoteChange: (note: string) => void;
  onAnalyze: () => void;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ tasks, note, onNoteChange, onAnalyze }) => {
    const hourlyData = useMemo(() => {
        const data = Array.from({ length: 12 }, (_, i) => ({
            name: `${i * 2}시`,
            완료수: 0,
        }));
        tasks.forEach(task => {
            if (task.status === Status.Done && task.completedAt) {
                const hour = new Date(task.completedAt).getHours();
                const index = Math.floor(hour / 2);
                if (data[index]) {
                    data[index].완료수 += 1;
                }
            }
        });
        return data;
    }, [tasks]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 space-y-3">
        <h2 className="text-lg font-bold text-white">차트</h2>
        <div>
            <h3 className="text-sm text-slate-300 mb-2">시간대별 완료 수</h3>
            <ResponsiveContainer width="100%" height={150}>
                <BarChart data={hourlyData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="name" tick={{ fill: '#94a3b8' }} fontSize={12} />
                    <YAxis allowDecimals={false} tick={{ fill: '#94a3b8' }} fontSize={12} />
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }}/>
                    <Bar dataKey="완료수" fill="#4f46e5" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5">
        <h2 className="text-lg font-bold text-white">AI 생산성 분석</h2>
        <p className="text-sm text-slate-400 mt-2 mb-4">완료된 할 일을 기반으로 AI가 학습 패턴과 개선점을 찾아줘요.</p>
        <button 
            onClick={onAnalyze}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 text-white font-bold py-3 px-4 rounded-md transition text-sm">
          ✨ 달성 결과 분석하기
        </button>
      </div>

      <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex-grow flex flex-col">
        <h2 className="text-lg font-bold text-white mb-2">성과 노트</h2>
        <textarea
          value={note}
          onChange={(e) => onNoteChange(e.target.value)}
          placeholder="오늘 무엇이 잘 됐나요? 내일 개선할 점은?"
          className="w-full flex-grow bg-slate-700 border border-slate-600 rounded-md p-2.5 text-sm text-white placeholder-slate-400 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
        ></textarea>
        <p className="text-xs text-slate-500 text-right mt-2">자동 저장됩니다</p>
      </div>
    </div>
  );
};
