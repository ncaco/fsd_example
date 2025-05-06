import React from 'react';

// 탭 아이템 인터페이스
export interface TabItem {
  id: string;
  label: string;
  children?: TabItem[];
}

// 계층형 탭 컴포넌트 Props
interface HierarchicalTabsProps {
  siteIdTabs: TabItem[];
  mainTabs: TabItem[];
  activeSiteId: string;
  activeMainTab: string;
  activeSubTab: string;
  onSiteIdTabClick: (tabId: string) => void;
  onMainTabClick: (tabId: string) => void;
  onSubTabClick: (tabId: string) => void;
}

/**
 * 계층형 탭 컴포넌트
 * 
 * 최대 3단계의 계층적 탭 구조를 표시합니다:
 * - 최상위 레벨: 사이트 ID 탭 (예: 홈, 관리자)
 * - 중간 레벨: 메인 탭 (예: 윈도우, 하단)
 * - 하위 레벨: 서브 탭 (예: 좌측, 우측)
 */
const HierarchicalTabs: React.FC<HierarchicalTabsProps> = ({
  siteIdTabs,
  mainTabs,
  activeSiteId,
  activeMainTab,
  activeSubTab,
  onSiteIdTabClick,
  onMainTabClick,
  onSubTabClick
}) => {
  // 현재 활성화된 메인 탭의 하위 탭 목록 가져오기
  const getSubTabs = () => {
    const foundTab = mainTabs.find(tab => tab.id === activeMainTab);
    return foundTab?.children || [];
  };

  // 사이트 ID 탭 변형 스타일
  const siteIdTabStyles = {
    active: 'bg-primary-500 text-white',
    inactive: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  };

  // 메인 탭 변형 스타일
  const mainTabStyles = {
    active: 'bg-primary-50 text-primary-700 border border-primary-300',
    inactive: 'text-gray-700 hover:bg-gray-100'
  };

  // 서브 탭 변형 스타일
  const subTabStyles = {
    active: 'bg-gray-100 text-gray-800 border border-gray-300',
    inactive: 'text-gray-600 hover:bg-gray-50'
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1 border-b border-gray-200 pb-2">
      {/* 사이트 ID 탭 */}
      <div className="flex gap-1 mr-2">
        {siteIdTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onSiteIdTabClick(tab.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeSiteId === tab.id
                ? siteIdTabStyles.active
                : siteIdTabStyles.inactive
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 구분선 */}
      <div className="h-6 border-l border-gray-300 mx-1"></div>
      
      {/* 메인 탭 (WINDOW/BOTTOM) */}
      <div className="flex gap-1 mr-2">
        {mainTabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => onMainTabClick(tab.id)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
              activeMainTab === tab.id
                ? mainTabStyles.active
                : mainTabStyles.inactive
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {/* 메인 탭이 서브탭을 가지고 있고 활성화된 경우에만 서브 탭 표시 */}
      {getSubTabs().length > 0 && (
        <>
          {/* 구분선 */}
          <div className="h-6 border-l border-gray-300 mx-1"></div>
          
          {/* 서브 탭 */}
          <div className="flex gap-1">
            {getSubTabs().map(tab => (
              <button
                key={tab.id}
                onClick={() => onSubTabClick(tab.id)}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeSubTab === tab.id
                    ? subTabStyles.active
                    : subTabStyles.inactive
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HierarchicalTabs; 