import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { Menu } from '@/entities/menu';
import { menuApi } from '@/features/menu/api/menu';

// 공유 UI 컴포넌트 불러오기
import { SearchBar, HierarchicalTabs, Spinner } from '@/shared/ui';
import TreeView, { TreeItem, TreeColumn } from '@/shared/ui/tree/TreeView';
import { filterTreeItems, convertToTreeItems } from '@/shared/ui/tree/utils';
import PageHeader from '@/shared/ui/pageHeader';
import StatusToggle from '@/shared/ui/status/StatusToggle';
import { TabItem } from '@/shared/ui/tab/HierarchicalTabs';
import { IconButton } from '@/shared/ui/button';

// 레이아웃 컴포넌트 불러오기
import { PageContainer } from '@/widgets/layouts/ALayout';
import { PAGE_MODES } from '@/shared/lib/utils/routingUtils';

// 더미 데이터 추가 (API 통신 실패시 사용)
const dummyMenuList: Menu[] = [
  {
    menuSn: 1,
    siteId: 'main',
    menuUpSn: 0,
    menuNm: '메뉴 1',
    menuSeCd: 'MENU',
    menuHelpCn: '메뉴 1에 대한 설명입니다.',
    sortSn: 1,
    useYn: 'Y',
    expsrYn: 'Y',
    rgtrId: 'admin',
    regDt: '2023-01-01',
    menuPosCd: 'TOP',
    moblUseYn: 'Y',
    moblPosCd: 'TOP',
    childMenus: [
      {
        menuSn: 3,
        siteId: 'main',
        menuUpSn: 1,
        menuNm: '메뉴 1-1',
        menuSeCd: 'MENU',
        menuHelpCn: '메뉴 1-1에 대한 설명입니다.',
        sortSn: 1,
        useYn: 'Y',
        expsrYn: 'Y',
        rgtrId: 'admin',
        regDt: '2023-01-01',
        menuPosCd: 'TOP',
        moblUseYn: 'Y',
        moblPosCd: 'TOP',
        childMenus: [],
        status: true,
        statusCode: 200,
        message: ''
      }
    ],
    status: true,
    statusCode: 200,
    message: ''
  },
  {
    menuSn: 2,
    siteId: 'main',
    menuUpSn: 0,
    menuNm: '메뉴 2',
    menuSeCd: 'MENU',
    menuHelpCn: '메뉴 2에 대한 설명입니다.',
    sortSn: 2,
    useYn: 'Y',
    expsrYn: 'N',
    rgtrId: 'admin',
    regDt: '2023-01-02',
    menuPosCd: 'TOP',
    moblUseYn: 'Y',
    moblPosCd: 'TOP',
    childMenus: [],
    status: true,
    statusCode: 200,
    message: ''
  }
];

// Menu를 TreeItem으로 변환하는 함수
const menuToTreeItemProps = (menu: Menu) => ({
  id: menu.menuSn,
  name: menu.menuNm,
  description: menu.menuHelpCn,
  children: menu.childMenus,
  data: menu,
  parentId: menu.menuUpSn
});

// 로딩 상태 키 생성 함수
const getLoadingKey = (id: number, field: string) => `${id}-${field}`;

function MenuListPage() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [fieldLoading, setFieldLoading] = useState<Record<string, boolean>>({});
  const [openNodes, setOpenNodes] = useState<Record<string | number, boolean>>({});
  
  // 탭 관련 상태
  const [activeSiteId, setActiveSiteId] = useState<string>('a');
  const [activeMainTab, setActiveMainTab] = useState<string>('WINDOW');
  const [activeSubTab, setActiveSubTab] = useState<string>('LEFT');
  
  // 사이트 ID 탭 목록
  const siteIdTabs: TabItem[] = [
    { id: 'home', label: '홈' },
    { id: 'a', label: '관리자' },
  ];
  
  // 메인 탭 목록
  const mainTabs: TabItem[] = [
    { 
      id: 'WINDOW', 
      label: '윈도우',
      children: [
        { id: 'LEFT', label: '좌측' },
        { id: 'BOTTOM', label: '하단' }
      ]
    },
    { 
      id: 'MOBILE', 
      label: '모바일',
      children: []
    }
  ];
  
  // 선택된 메뉴 위치 코드에 따라 메뉴 필터링
  const getFilteredMenusByPosition = useCallback((menus: Menu[]): Menu[] => {
    if (!menus) return [];
    
    let filteredMenus = [...menus];
    
    // 메인 탭에 따라 필터링
    if (activeMainTab === 'WINDOW') {
      // WINDOW 내에서 LEFT/RIGHT/BOTTOM 탭에 따라 추가 필터링
      if (activeSubTab === 'LEFT') {
        filteredMenus = filteredMenus.filter(menu => menu.menuPosCd === 'C002');
      } else if (activeSubTab === 'RIGHT') {
        filteredMenus = filteredMenus.filter(menu => menu.menuPosCd === 'C003');
      } else if (activeSubTab === 'BOTTOM') {
        filteredMenus = filteredMenus.filter(menu => menu.menuPosCd === 'C004');
      }
    } else if (activeMainTab === 'MOBILE') {
      // 모바일 탭에 따른 필터링
      filteredMenus = filteredMenus.filter(menu => menu.moblUseYn === 'Y');
    }
    
    return filteredMenus;
  }, [activeMainTab, activeSubTab]);
  
  // 검색어에 따라 노드 자동 확장
  useEffect(() => {
    if (menuList.length > 0) {
      // 모든 노드 ID 가져오기
      const allNodes: Record<string | number, boolean> = {};
      
      const addAllNodeIds = (menus: Menu[]) => {
        menus.forEach(menu => {
          // 검색어가 있으면 모든 노드 열기, 없으면 최상위 노드만 열기
          allNodes[menu.menuSn] = searchTerm !== '' || menu.menuUpSn === 0;
          
          if (menu.childMenus && menu.childMenus.length > 0) {
            addAllNodeIds(menu.childMenus);
          }
        });
      };
      
      addAllNodeIds(menuList);
      setOpenNodes(allNodes);
    }
  }, [searchTerm, menuList]);
  
  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        setLoading(true);
        let list: Menu[] = [];
        
        try {
          // API에서 메뉴 트리 가져오기
          list = await menuApi.getMenuTreeList(activeSiteId);
        } catch (apiError) {
          console.error('API 호출 실패, 더미 데이터 사용:', apiError);
          list = [...dummyMenuList]; // 더미 데이터 사용
        }
        
        setMenuList(list);
        
        // 초기에는 최상위 노드만 열기
        const initialOpenNodes: Record<string | number, boolean> = {};
        list.forEach(menu => {
          initialOpenNodes[menu.menuSn] = true;
        });
        setOpenNodes(initialOpenNodes);
      } catch (error) {
        console.error('메뉴 목록 조회 실패:', error);
        setMenuList(dummyMenuList);
        
        // 에러 시 더미 데이터의 최상위 노드만 열기
        const initialOpenNodes: Record<string | number, boolean> = {};
        dummyMenuList.forEach(menu => {
          initialOpenNodes[menu.menuSn] = true;
        });
        setOpenNodes(initialOpenNodes);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuList();
  }, [activeSiteId]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const toggleNode = (nodeId: string | number) => {
    setOpenNodes(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };
  
  const goToCreate = () => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.CREATE } });
  };
  
  const goToEdit = useCallback((sn: number) => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.EDIT, sn } });
  }, [navigate]);
  
  const goToShow = useCallback((sn: number) => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.SHOW, sn } });
  }, [navigate]);
  
  // 메뉴를 TreeItem으로 변환
  const menuTreeItems = useMemo(() => {
    // 현재 탭 선택에 따라 메뉴 필터링
    const filteredMenus = getFilteredMenusByPosition(menuList);
    return convertToTreeItems(filteredMenus, menuToTreeItemProps);
  }, [menuList, getFilteredMenusByPosition]);

  // 검색어로 필터링된 트리 아이템 목록
  const filteredTreeItems = useMemo(() => {
    return filterTreeItems(menuTreeItems, searchTerm, ['menuNm', 'menuHelpCn']);
  }, [menuTreeItems, searchTerm]);
  
  // 필드 로딩 상태 설정 함수
  const setFieldLoadingState = useCallback((id: number, field: string, isLoading: boolean) => {
    const key = getLoadingKey(id, field);
    setFieldLoading(prev => ({
      ...prev,
      [key]: isLoading
    }));
  }, []);
  
  // 필드 로딩 상태 확인 함수
  const isFieldLoading = useCallback((id: number, field: string) => {
    const key = getLoadingKey(id, field);
    return fieldLoading[key] || false;
  }, [fieldLoading]);
  
  // useYn 상태 변경 핸들러
  const handleToggleUseYn = useCallback(async (menu: Menu, newStatus: boolean) => {
    try {
      setFieldLoadingState(menu.menuSn, 'useYn', true);
      
      // Y 또는 N으로 변환
      const newUseYn = newStatus ? 'Y' : 'N';
      
      // API 호출
      await menuApi.setUseYn(menu.menuSn, newUseYn);
      
      // 상태 업데이트
      setMenuList(prevList => {
        const updateMenu = (menus: Menu[]): Menu[] => {
          return menus.map(m => {
            if (m.menuSn === menu.menuSn) {
              return { ...m, useYn: newUseYn };
            }
            
            if (m.childMenus?.length) {
              return { ...m, childMenus: updateMenu(m.childMenus) };
            }
            
            return m;
          });
        };
        
        return updateMenu(prevList);
      });
      
      // 성공 메시지
      console.log(`메뉴 "${menu.menuNm}" 상태가 ${newStatus ? '활성화' : '비활성화'}로 변경되었습니다.`);
    } catch (error) {
      console.error('메뉴 상태 변경 실패:', error);
      // 에러 처리 - 필요시 alert 등으로 사용자에게 알림
    } finally {
      setFieldLoadingState(menu.menuSn, 'useYn', false);
    }
  }, [setFieldLoadingState, setMenuList]);
  
  // expsrYn 상태 변경 핸들러
  const handleToggleExpsrYn = useCallback(async (menu: Menu, newStatus: boolean) => {
    try {
      setFieldLoadingState(menu.menuSn, 'expsrYn', true);
      
      // Y 또는 N으로 변환
      const newExpsrYn = newStatus ? 'Y' : 'N';
      
      // API 호출 (실제 API 메서드로 대체 필요)
      await menuApi.setExpsrYn(menu.menuSn, newExpsrYn);
      
      // 상태 업데이트
      setMenuList(prevList => {
        const updateMenu = (menus: Menu[]): Menu[] => {
          return menus.map(m => {
            if (m.menuSn === menu.menuSn) {
              return { ...m, expsrYn: newExpsrYn };
            }
            
            if (m.childMenus?.length) {
              return { ...m, childMenus: updateMenu(m.childMenus) };
            }
            
            return m;
          });
        };
        
        return updateMenu(prevList);
      });
      
      // 성공 메시지
      console.log(`메뉴 "${menu.menuNm}" 노출 상태가 ${newStatus ? '노출' : '비노출'}로 변경되었습니다.`);
    } catch (error) {
      console.error('메뉴 노출 상태 변경 실패:', error);
      // 에러 처리 - 필요시 alert 등으로 사용자에게 알림
    } finally {
      setFieldLoadingState(menu.menuSn, 'expsrYn', false);
    }
  }, [setFieldLoadingState, setMenuList]);
  
  // 메뉴 아이템 이동 핸들러
  const handleMenuMove = useCallback(async (draggedItemId: string | number, targetItemId: string | number, position: 'before' | 'after' | 'inside') => {
    try {
      setLoading(true);

      // 메뉴 아이템 찾기
      const findMenuItem = (list: Menu[], id: string | number): Menu | null => {
        for (const menu of list) {
          if (menu.menuSn === id) {
            return menu;
          }
          
          if (menu.childMenus?.length) {
            const found = findMenuItem(menu.childMenus, id);
            if (found) return found;
          }
        }
        
        return null;
      };
      
      // 타겟 메뉴 아이템 찾기
      const targetMenu = findMenuItem(menuList, targetItemId);
      if (!targetMenu) {
        console.error('타겟 메뉴를 찾을 수 없습니다.');
        return;
      }
      
      // 드래그 중인 메뉴 아이템 찾기
      const draggedMenu = findMenuItem(menuList, draggedItemId);
      if (!draggedMenu) {
        console.error('드래그 중인 메뉴를 찾을 수 없습니다.');
        return;
      }
      
      let newParentId: number;
      let newSortSn: number;
      
      // 위치에 따라 부모 ID와 정렬 순서 결정
      switch (position) {
        case 'inside':
          newParentId = Number(targetItemId);
          newSortSn = targetMenu.childMenus?.length ? targetMenu.childMenus.length + 1 : 1;
          break;
        case 'before':
          newParentId = targetMenu.menuUpSn;
          newSortSn = targetMenu.sortSn;
          // 기존 메뉴 재정렬 필요 (API에서 처리 가정)
          break;
        case 'after':
          newParentId = targetMenu.menuUpSn;
          newSortSn = targetMenu.sortSn + 1;
          // 기존 메뉴 재정렬 필요 (API에서 처리 가정)
          break;
        default:
          console.error('유효하지 않은 드래그 위치입니다.');
          return;
      }
      
      // API 호출
      console.log(`메뉴 이동: ${draggedMenu.menuNm}를 ${position} ${targetMenu.menuNm} (새 부모: ${newParentId}, 새 순서: ${newSortSn})`);
      
      // 실제 API 호출
      await menuApi.moveMenu(Number(draggedItemId), newParentId, newSortSn);
      
      // 성공 시 메뉴 목록 다시 불러오기
      const updatedList = await menuApi.getMenuTreeList(activeSiteId);
      setMenuList(updatedList);
      
    } catch (error) {
      console.error('메뉴 이동 실패:', error);
      // 에러 처리
    } finally {
      setLoading(false);
    }
  }, [menuList, activeSiteId, setMenuList, setLoading]);
  
  // 메뉴 상태(useYn) 렌더링 함수
  const renderMenuStatus = useCallback((item: TreeItem<Menu>) => {
    const menu = item.data!;
    const isLoading = isFieldLoading(menu.menuSn, 'useYn');
    
    return isLoading ? (
      <Spinner size="sm" color="primary" className="w-16" />
    ) : (
      <StatusToggle 
        item={menu} 
        statusField="useYn"
        activeLabel="사용"
        inactiveLabel="미사용"
        clickable={true}
        size="sm"
        iconMode={false}
        onToggle={handleToggleUseYn}
        width={70}
        tooltip="사용 여부 변경"
      />
    );
  }, [isFieldLoading, handleToggleUseYn]);

  // 메뉴 노출여부(expsrYn) 렌더링 함수
  const renderMenuExposure = useCallback((item: TreeItem<Menu>) => {
    const menu = item.data!;
    const isLoading = isFieldLoading(menu.menuSn, 'expsrYn');
    
    return isLoading ? (
      <Spinner size="sm" color="primary" className="w-16" />
    ) : (
      <StatusToggle 
        item={menu} 
        statusField="expsrYn"
        activeLabel="노출"
        inactiveLabel="비노출"
        clickable={true}
        size="sm"
        iconMode={false}
        width={70}
        tooltip="노출 여부 변경"
        onToggle={handleToggleExpsrYn}
      />
    );
  }, [isFieldLoading, handleToggleExpsrYn]);

  // 메뉴 액션 렌더링 함수
  const renderMenuActions = useCallback((item: TreeItem<Menu>) => {
    const menu = item.data!;
    
    return (
      <>
        <IconButton
          icon="detail"
          variant="white"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            goToShow(menu.menuSn);
          }}
          label="상세 보기"
          tooltip="상세 정보 보기"
          tooltipPosition="top"
        />
        
        <IconButton
          icon="edit"
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            goToEdit(menu.menuSn);
          }}
          label="메뉴 수정"
          tooltip="메뉴 수정하기"
          tooltipPosition="top"
          className="text-red-600"
        />
      </>
    );
  }, [goToShow, goToEdit]);

  // 트리 컬럼 정의
  const treeColumns = useMemo<TreeColumn<Menu>[]>(() => [
    {
      id: 'name',
      header: '메뉴명',
      renderCell: () => null // 기본 렌더링 사용
    },
    {
      id: 'useYn',
      header: '사용여부',
      width: 80,
      renderCell: renderMenuStatus
    },
    {
      id: 'expsrYn',
      header: '노출여부',
      width: 80,
      renderCell: renderMenuExposure
    },
    {
      id: 'actions',
      header: '관리',
      width: 100,
      renderCell: renderMenuActions
    }
  ], [renderMenuStatus, renderMenuExposure, renderMenuActions]); // 렌더링 함수가 변경될 때 컬럼 정의도 다시 생성

  // 탭 클릭 핸들러
  const handleSiteIdTabClick = (tabId: string) => {
    setActiveSiteId(tabId);
  };
  
  const handleMainTabClick = (tabId: string) => {
    setActiveMainTab(tabId);
    
    // 기본값 설정
    if (tabId === 'WINDOW') {
      setActiveSubTab('LEFT');
    } else if (tabId === 'MOBILE') {
      setActiveSubTab('MAIN');
    } else {
      // 다른 메인 탭의 경우 서브탭 선택 초기화
      setActiveSubTab('');
    }
  };
  
  const handleSubTabClick = (tabId: string) => {
    setActiveSubTab(tabId);
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="메뉴 관리"
        description="웹사이트의 메뉴를 관리할 수 있습니다."
        buttons={[
          {
            label: "메뉴 등록",
            onClick: goToCreate,
            variant: "primary",
            icon: "plus",
            size: "medium"
          }
        ]}
      />
      
      {/* 계층형 탭 컴포넌트 사용 */}
      <HierarchicalTabs
        siteIdTabs={siteIdTabs}
        mainTabs={mainTabs}
        activeSiteId={activeSiteId}
        activeMainTab={activeMainTab}
        activeSubTab={activeSubTab}
        onSiteIdTabClick={handleSiteIdTabClick}
        onMainTabClick={handleMainTabClick}
        onSubTabClick={handleSubTabClick}
      />
      
      <SearchBar 
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        placeholder="메뉴명 또는 설명으로 검색"
      />
      
      {loading ? (
        <Spinner 
          size="lg" 
          color="primary" 
          label="메뉴 목록을 불러오는 중입니다" 
          fullPage={true}
        />
      ) : (
        <TreeView<Menu>
          items={filteredTreeItems}
          openNodes={openNodes}
          toggleNode={toggleNode}
          columns={treeColumns}
          emptyMessage="표시할 메뉴가 없습니다."
          showHeader={true}
          draggable={true}
          onItemMove={handleMenuMove}
        />
      )}
    </PageContainer>
  );
}

export default MenuListPage;

