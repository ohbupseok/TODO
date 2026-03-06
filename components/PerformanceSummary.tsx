
import React, { useMemo } from 'react';
import { Task, Status } from '../types';

interface PerformanceSummaryProps {
  tasks: Task[];
}

const InfoCard: React.FC<{ title: string; value: string; description: string }> = ({ title, value, description }) => (
    <div className="bg-slate-800 p-4 rounded-lg">
        <p className="text-xs text-slate-400">{title}</p>
        <p className="text-2xl font-bold text-white mt-1">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
    </div>
);

export const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ tasks }) => {
    const summary = useMemo(() => {
        const totalTasks = tasks.length;
        const completedTasks = tasks.filter(t => t.status === Status.Done);
        const completionRate = totalTasks > 0 ? Math.round((completedTasks.length / totalTasks) * 100) : 0;

        const totalFocusTime = tasks.reduce((acc, task) => acc + task.actualTime, 0);
        const totalFocusMinutes = Math.floor(totalFocusTime / 60);

        const tasksWithPrediction = completedTasks.filter(t => t.estimatedTime > 0);
        const predictionAccuracy = tasksWithPrediction.length > 0
            ? Math.round(tasksWithPrediction.reduce((acc, task) => {
                const actual = task.actualTime / 60;
                const estimated = task.estimatedTime;
                const accuracy = actual > estimated ? (estimated / actual) : (actual / estimated);
                return acc + accuracy;
            }, 0) / tasksWithPrediction.length * 100)
            : 0;

        const performanceScore = Math.round((completionRate * 0.7) + (predictionAccuracy * 0.3));

        return {
            completionRate,
            completedCount: completedTasks.length,
            totalCount: totalTasks,
            totalFocusMinutes,
            predictionAccuracy,
            performanceScore
        };
    }, [tasks]);

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-5 flex-grow flex flex-col">
      <h2 className="text-lg font-bold text-white mb-4">오늘의 성과</h2>
      <div className="space-y-5">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span className="text-slate-300">완료율</span>
            <span className="text-slate-400">{summary.completedCount} / {summary.totalCount}</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2.5">
            <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: `${summary.completionRate}%` }}></div>
          </div>
           <p className="text-right text-sm font-bold mt-1">{summary.completionRate}%</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <InfoCard title="총 집중 시간" value={`${summary.totalFocusMinutes}분`} description="실제 타이머 누적" />
            <InfoCard title="예측 정확도" value={`${summary.predictionAccuracy}%`} description="완료된 예측 작업 기준" />
        </div>
         <div>
            <InfoCard title="성과 점수" value={`${summary.performanceScore}점`} description="완료율과 예측 정확도 기반" />
        </div>

      </div>
    </div>
  );
};
