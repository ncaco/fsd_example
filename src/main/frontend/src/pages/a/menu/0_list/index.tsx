import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { Menu } from '@/entities/menu';

// 공유 UI 컴포넌트 불러오기
import { SearchBar, TreeView, TopButton, getFilteredMenus } from '@/shared/ui';

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

function MenuListPage() {
  const navigate = useNavigate();
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [openNodes, setOpenNodes] = useState<Record<number, boolean>>({});
  
  const siteId = 'main'; // 기본 사이트 ID
  
  // 검색어에 따라 노드 자동 확장
  useEffect(() => {
    if (menuList.length > 0) {
      // 모든 노드 ID 가져오기
      const allNodes: Record<number, boolean> = {};
      
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
          //list = await menuApi.getMenuList(siteId);
          list = [...dummyMenuList];
        } catch (apiError) {
          console.error('API 호출 실패, 더미 데이터 사용:', apiError);
          list = [...dummyMenuList]; // 더미 데이터 사용
        }
        
        setMenuList(list);
        
        // 초기에는 최상위 노드만 열기
        const initialOpenNodes: Record<number, boolean> = {};
        list.forEach(menu => {
          initialOpenNodes[menu.menuSn] = true;
        });
        setOpenNodes(initialOpenNodes);
      } catch (error) {
        console.error('메뉴 목록 조회 실패:', error);
        setMenuList(dummyMenuList);
        
        // 에러 시 더미 데이터의 최상위 노드만 열기
        const initialOpenNodes: Record<number, boolean> = {};
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
  
  const toggleNode = (nodeId: number) => {
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
  
  // 검색어로 필터링된 메뉴 목록
  const filteredMenus = useMemo(() => {
    return getFilteredMenus(menuList, searchTerm);
  }, [menuList, searchTerm]);
  
  return (
    <div style={{ padding: '20px' }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>메뉴 관리</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <TopButton 
            onClick={goToCreate} 
            label="메뉴 등록" 
            variant="primary"
            icon="plus"
            size="medium"
          />
        </div>
      </div>
      
      <SearchBar 
        searchTerm={searchTerm}
        onChange={handleSearchChange}
        placeholder="메뉴명 또는 설명으로 검색"
      />
      
      {loading ? (
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          padding: '40px 0'
        }}>
          로딩 중...
        </div>
      ) : (
        <TreeView 
          items={filteredMenus}
          goToEdit={goToEdit}
          goToShow={goToShow}
          openNodes={openNodes}
          toggleNode={toggleNode}
          emptyMessage="표시할 메뉴가 없습니다."
        />
      )}
    </div>
  );
}

export default MenuListPage;

