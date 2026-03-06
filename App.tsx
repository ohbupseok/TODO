import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI, Type } from "@google/genai";
import { Task, Category, Status, TimerMode, Priority } from './types';
import { INITIAL_TASKS, TIMER_DURATIONS, CATEGORIES } from './constants';
import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { MainPanel } from './components/MainPanel';
import { AnalysisPanel } from './components/AnalysisPanel';
import { AIAnalysisModal } from './components/AIAnalysisModal';
import { EditTaskModal } from './components/EditTaskModal';
import { SettingsModal } from './components/SettingsModal';
import { CategoryManagerModal } from './components/CategoryManagerModal';
import { AppInfoModal } from './components/AppInfoModal';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filterCategory, setFilterCategory] = useState<Category>(Category.All);
  const [timerMode, setTimerMode] = useState<TimerMode>(TimerMode.Focus);
  const [timerDurations, setTimerDurations] = useState(TIMER_DURATIONS);
  const [time, setTime] = useState(timerDurations[timerMode]);
  const [isActive, setIsActive] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(1);
  const [note, setNote] = useState('');
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiAnalysisResult, setAiAnalysisResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // New states for modals and dynamic data
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);
  const [showAppInfoModal, setShowAppInfoModal] = useState(false);


  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1);
        if (activeTaskId && timerMode === TimerMode.Focus) {
          setTasks(prevTasks =>
            prevTasks.map(task =>
              task.id === activeTaskId ? { ...task, actualTime: task.actualTime + 1 } : task
            )
          );
        }
      }, 1000);
    } else if (!isActive && time !== 0) {
      if (interval) clearInterval(interval);
    } else if (time === 0) {
        setIsActive(false);
        alert(`${timerMode} time is over!`);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, time, activeTaskId, timerMode]);
  
  // Update time when durations change
  useEffect(() => {
    if (!isActive) {
      setTime(timerDurations[timerMode]);
    }
  }, [timerDurations, timerMode, isActive]);

  const toggleTimer = useCallback(() => {
    if(!activeTaskId && timerMode === TimerMode.Focus){
        alert("Please select a task to start the timer.");
        return;
    }
    setIsActive(!isActive);
  }, [isActive, activeTaskId, timerMode]);

  const changeTimerMode = useCallback((mode: TimerMode) => {
    setIsActive(false);
    setTimerMode(mode);
    setTime(timerDurations[mode]);
  }, [timerDurations]);

  const handleAddTask = (task: Omit<Task, 'id' | 'actualTime' | 'status' | 'createdAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),
      actualTime: 0,
      status: Status.Todo,
      createdAt: new Date(),
    };
    setTasks(prevTasks => [...prevTasks, newTask]);
  };
  
  const handleTaskAction = (id: number, action: 'toggle' | 'delete' | 'start' | 'edit') => {
    if(action === 'toggle') {
      setTasks(tasks.map(task => task.id === id ? { ...task, status: task.status === Status.Done ? Status.InProgress : Status.Done, completedAt: task.status !== Status.Done ? new Date() : undefined } : task));
    } else if (action === 'delete') {
      setTasks(tasks.filter(task => task.id !== id));
    } else if (action === 'start') {
        setActiveTaskId(id);
        setTimerMode(TimerMode.Focus);
        setTime(timerDurations[TimerMode.Focus]);
        setIsActive(true);
    } else if (action === 'edit') {
        const taskToEdit = tasks.find(t => t.id === id);
        if (taskToEdit) setEditingTask(taskToEdit);
    }
  };
  
  const handleUpdateTask = (updatedTask: Task) => {
    setTasks(tasks.map(t => t.id === updatedTask.id ? updatedTask : t));
    setEditingTask(null);
  };

  const handleExport = (format: 'json' | 'csv') => {
    if (format === 'json') {
        const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(tasks, null, 2))}`;
        const link = document.createElement('a');
        link.href = jsonString;
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    } else if (format === 'csv') {
        const header = 'id,title,category,priority,estimatedTime,actualTime,status,createdAt,completedAt\n';
        const rows = tasks.map(t =>
            [t.id, `"${t.title.replace(/"/g, '""')}"`, t.category, t.priority, t.estimatedTime, t.actualTime, t.status, t.createdAt.toISOString(), t.completedAt?.toISOString() || ''].join(',')
        ).join('\n');
        const csvString = `data:text/csv;charset=utf-8,\uFEFF${encodeURIComponent(header + rows)}`;
        const link = document.createElement('a');
        link.href = csvString;
        link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    }
  };

  const handleResetDay = () => {
      if (window.confirm('정말로 모든 작업을 초기화하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
          setTasks([]);
          setNote('');
          setActiveTaskId(null);
          setIsActive(false);
          setTimerMode(TimerMode.Focus);
          setTime(timerDurations[TimerMode.Focus]);
      }
  };
  
  const handleUpdateSettings = (newDurations: Record<TimerMode, number>) => {
    setTimerDurations(newDurations);
    setShowSettingsModal(false);
  };
  
  const handleUpdateCategories = (newCategories: Category[]) => {
      setCategories(newCategories);
      setShowCategoryModal(false);
  };

  const analyzeWithAI = async () => {
    setIsAnalyzing(true);
    setShowAIModal(true);
    setAiAnalysisResult('');
    
    const completedTasks = tasks.filter(t => t.status === Status.Done);
    if(completedTasks.length === 0){
        setAiAnalysisResult("완료된 작업이 없어 분석할 수 없습니다. 작업을 완료하고 다시 시도해주세요.");
        setIsAnalyzing(false);
        return;
    }

    const prompt = `
      다음은 오늘 내가 완료한 작업 목록입니다.
      - ${completedTasks.map(t => `${t.title} (카테고리: ${t.category}, 예상시간: ${t.estimatedTime}분, 실제 걸린 시간: ${Math.floor(t.actualTime / 60)}분)`).join('\n- ')}

      이 데이터를 기반으로 나의 생산성 패턴을 분석하고, 학습 습관이나 업무 효율성을 개선할 수 있는 구체적인 조언 3가지를 한국어로 제안해주세요.
      결과는 아래 JSON 형식으로 반환해주세요.
      
      {
        "analysis": "당신의 생산성 패턴에 대한 전반적인 분석입니다.",
        "suggestions": [
          { "title": "제안 1 제목", "description": "첫 번째 제안에 대한 상세 설명입니다." },
          { "title": "제안 2 제목", "description": "두 번째 제안에 대한 상세 설명입니다." },
          { "title": "제안 3 제목", "description": "세 번째 제안에 대한 상세 설명입니다." }
        ]
      }
    `;

    try {
      if (!process.env.API_KEY) {
        throw new Error("API_KEY is not set in environment variables.");
      }
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              analysis: { type: Type.STRING },
              suggestions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    description: { type: Type.STRING },
                  },
                  required: ["title", "description"],
                }
              }
            }
          }
        }
      });
      setAiAnalysisResult(response.text);
    } catch (error) {
      console.error("AI analysis failed:", error);
      setAiAnalysisResult("AI 분석 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const filteredTasks = useMemo(() => 
    tasks.filter(task => filterCategory === Category.All || task.category === filterCategory),
    [tasks, filterCategory]
  );

  return (
    <div className="min-h-screen text-white p-4 font-sans flex flex-col gap-4 bg-slate-900">
      <Header 
        time={time} 
        timerMode={timerMode} 
        isActive={isActive}
        onToggleTimer={toggleTimer}
        onChangeTimerMode={changeTimerMode}
        onExport={handleExport}
        onResetDay={handleResetDay}
        onShowCategoryManager={() => setShowCategoryModal(true)}
        onShowSettings={() => setShowSettingsModal(true)}
        onShowAppInfo={() => setShowAppInfoModal(true)}
      />
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-grow">
        <div className="lg:col-span-3">
          <TaskList 
            tasks={filteredTasks} 
            activeFilter={filterCategory} 
            onFilterChange={setFilterCategory}
            onTaskAction={handleTaskAction}
            activeTaskId={activeTaskId}
            categories={categories}
          />
        </div>
        <div className="lg:col-span-5">
          <MainPanel onAddTask={handleAddTask} tasks={tasks} categories={categories} />
        </div>
        <div className="lg:col-span-4">
          <AnalysisPanel 
            tasks={tasks} 
            note={note} 
            onNoteChange={setNote}
            onAnalyze={analyzeWithAI}
          />
        </div>
      </main>
      {showAIModal && (
        <AIAnalysisModal
          isLoading={isAnalyzing}
          result={aiAnalysisResult}
          onClose={() => setShowAIModal(false)}
        />
      )}
      {editingTask && (
        <EditTaskModal 
            isOpen={!!editingTask}
            onClose={() => setEditingTask(null)}
            onSave={handleUpdateTask}
            task={editingTask}
            categories={categories}
        />
      )}
       {showSettingsModal && (
        <SettingsModal
          isOpen={showSettingsModal}
          onClose={() => setShowSettingsModal(false)}
          onSave={handleUpdateSettings}
          currentDurations={timerDurations}
        />
      )}
      {showCategoryModal && (
        <CategoryManagerModal
          isOpen={showCategoryModal}
          onClose={() => setShowCategoryModal(false)}
          onSave={handleUpdateCategories}
          categories={categories}
          tasks={tasks}
        />
      )}
      {showAppInfoModal && (
        <AppInfoModal
            isOpen={showAppInfoModal}
            onClose={() => setShowAppInfoModal(false)}
        />
      )}
    </div>
  );
};

export default App;