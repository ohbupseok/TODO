import React from 'react';
import { Modal } from './Modal';

interface AppInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppInfoModal: React.FC<AppInfoModalProps> = ({ isOpen, onClose }) => {
  return (
    <Modal title="앱 설명서" isOpen={isOpen} onClose={onClose}>
      <div className="text-slate-300 space-y-4 text-sm">
        <p>
          <strong>✨ 오늘의 할 일 & 성과</strong>는 사용자가 일일 작업과 학습을 효율적으로 관리하고 생산성을 향상시키는 데 도움이 되는 애플리케이션입니다.
        </p>
        <p>
          주요 기능은 다음과 같습니다:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-2 bg-slate-700/50 p-4 rounded-md">
          <li><strong>할 일 관리:</strong> 카테고리, 우선순위, 예상 시간을 설정하여 작업을 추가하고 관리합니다.</li>
          <li><strong>포모도로 타이머:</strong> Focus, Short Break, Long Break 모드를 사용하여 집중력을 높이고 번아웃을 방지합니다. 타이머 설정은 타이머 옆 설정 아이콘에서 변경할 수 있습니다.</li>
          <li><strong>성과 요약:</strong> 완료율, 총 집중 시간, 예측 정확도를 기반으로 일일 성과를 시각적으로 확인합니다.</li>
          <li><strong>데이터 내보내기:</strong> 작업 데이터를 JSON 또는 CSV 파일로 내보내 보관하거나 다른 곳에서 활용할 수 있습니다.</li>
          <li><strong>AI 생산성 분석:</strong> 완료된 작업을 기반으로 AI가 생산성 패턴을 분석하고 개선점을 제안합니다.</li>
          <li><strong>사용자화:</strong> 타이머 시간과 작업 카테고리를 직접 설정하여 자신에게 맞는 환경을 만들 수 있습니다.</li>
        </ul>
        <p className="mt-4 pt-4 border-t border-slate-700">
          이 앱을 통해 매일의 목표를 체계적으로 달성하고, 자신의 성과를 돌아보며 성장하는 경험을 해보세요!
        </p>
      </div>
       <div className="mt-6 flex justify-end">
            <button type="button" onClick={onClose} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-md transition text-sm">
                확인
            </button>
        </div>
    </Modal>
  );
};