import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Menu } from '@/entities/menu';
import { menuApi } from '@/features/menu/api/menu';

// 공유 UI 컴포넌트 불러오기
import { SearchBar } from '@/shared/ui';
import TreeView, { TreeItem } from '@/shared/ui/tree/TreeView';
import { filterTreeItems, convertToTreeItems } from '@/shared/ui/tree/utils';
import PageHeader from '@/shared/ui/pageHeader';
import StatusLabel from '@/shared/ui/status/StatusLabel';

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
  data: menu
});

function MenuListPage() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [openNodes, setOpenNodes] = useState<Record<string | number, boolean>>({});
  
  const siteId = 'a'; // 기본 사이트 ID
  
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
          list = await menuApi.getMenuTreeList(siteId);
          
          console.log('메뉴 트리 데이터:', list);
          console.log('최상위 메뉴 수:', list.length);
          
          // 자식 메뉴 로깅
          list.forEach(menu => {
            console.log(`메뉴 "${menu.menuNm}" (ID: ${menu.menuSn})의 자식 메뉴 수: ${menu.childMenus?.length || 0}`);
            if (menu.childMenus && menu.childMenus.length > 0) {
              menu.childMenus.forEach(child => {
                console.log(`- 자식 메뉴: "${child.menuNm}" (ID: ${child.menuSn})`);
              });
            }
          });
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
  }, [siteId]);
  
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
    navigate('/a/menu', { state: { pgMode: 'create' } });
  };
  
  const goToEdit = (sn: number) => {
    navigate('/a/menu', { state: { pgMode: 'edit', sn } });
  };
  
  const goToShow = (sn: number) => {
    navigate('/a/menu', { state: { pgMode: 'show', sn } });
  };
  
  // 메뉴를 TreeItem으로 변환
  const menuTreeItems = useMemo(() => {
    return convertToTreeItems(menuList, menuToTreeItemProps);
  }, [menuList]);

  // 검색어로 필터링된 트리 아이템 목록
  const filteredTreeItems = useMemo(() => {
    return filterTreeItems(menuTreeItems, searchTerm, ['menuNm', 'menuHelpCn']);
  }, [menuTreeItems, searchTerm]);
  
  // 메뉴 액션 렌더링 함수
  const renderMenuActions = (item: TreeItem<Menu>) => {
    const menu = item.data!;
    
    return (
      <>
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToShow(menu.menuSn);
          }}
          className="border border-gray-200 bg-white rounded px-2.5 py-1 text-xs text-gray-600 transition-all shadow-sm hover:border-gray-300 hover:text-gray-800"
        >
          상세
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToEdit(menu.menuSn);
          }}
          className="border border-blue-500 bg-white rounded px-2.5 py-1 text-xs text-blue-500 transition-all shadow-sm hover:bg-blue-50"
        >
          수정
        </button>
      </>
    );
  };

  // 메뉴 상태 렌더링 함수
  const renderMenuStatus = (item: TreeItem<Menu>) => {
    const menu = item.data!;
    return <StatusLabel menu={menu} />;
  };
  
  return (
    <div className="p-5">
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
      
      <SearchBar 
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        placeholder="메뉴명 또는 설명으로 검색"
      />
      
      {loading ? (
        <div className="flex justify-center py-10">
          로딩 중...
        </div>
      ) : (
        <TreeView<Menu>
          items={filteredTreeItems}
          openNodes={openNodes}
          toggleNode={toggleNode}
          renderActions={renderMenuActions}
          getItemStatus={renderMenuStatus}
          emptyMessage="표시할 메뉴가 없습니다."
        />
      )}
    </div>
  );
}

export default MenuListPage;

