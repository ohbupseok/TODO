
import React from 'react';

interface AIAnalysisModalProps {
  isLoading: boolean;
  result: string;
  onClose: () => void;
}

interface AnalysisResult {
  analysis: string;
  suggestions: {
    title: string;
    description: string;
  }[];
}

const parseResult = (jsonString: string): AnalysisResult | null => {
    try {
        if (!jsonString) return null;
        // Sometimes the model wraps the JSON in ```json ... ```
        const cleanedString = jsonString.replace(/^```json\s*|```$/g, '');
        return JSON.parse(cleanedString);
    } catch (error) {
        console.error("Failed to parse AI result:", error);
        return null;
    }
}


export const AIAnalysisModal: React.FC<AIAnalysisModalProps> = ({ isLoading, result, onClose }) => {
    const parsedResult = parseResult(result);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
                    <p className="mt-4 text-slate-300">AI가 생산성을 분석하고 있습니다...</p>
                </div>
            );
        }

        if (parsedResult) {
            return (
                <div className="text-left space-y-6">
                    <div>
                        <h3 className="font-bold text-lg text-white mb-2">📊 생산성 분석</h3>
                        <p className="text-slate-300 bg-slate-700/50 p-3 rounded-md">{parsedResult.analysis}</p>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg text-white mb-2">💡 개선 제안</h3>
                        <ul className="space-y-3">
                            {parsedResult.suggestions.map((s, index) => (
                                <li key={index} className="bg-slate-700/50 p-3 rounded-md">
                                    <p className="font-semibold text-indigo-400">{s.title}</p>
                                    <p className="text-sm text-slate-300 mt-1">{s.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            );
        }

        // Fallback for non-JSON or error messages
        return <p className="text-slate-300">{result || "분석 결과를 불러올 수 없습니다."}</p>;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">AI 분석 결과</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
                </div>
                {renderContent()}
                 <div className="mt-6 text-right">
                     <button onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition text-sm">
                         닫기
                     </button>
                 </div>
            </div>
        </div>
    );
};
