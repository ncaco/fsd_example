import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from '@/entities/menu';
import { menuApi } from '@/features/menu/api/menu';
import { cmmCdApi } from '@/features/cmmCd/api/cmmCd';
import { CmmCd } from '@/entities';
import { PageContainer } from '@/widgets/layouts/ALayout';
import PageHeader from '@/shared/ui/pageHeader';
import MenuForm from '../components/MenuForm';
import { PAGE_MODES } from '@/shared/lib/utils/routingUtils';

const MenuShowPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sn } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<Menu[]>([]);
  const [menuSeCdList, setMenuSeCdList] = useState<CmmCd[]>([]);
  const [menuPosCdList, setMenuPosCdList] = useState<CmmCd[]>([]);
  const [moblPosCdList, setMoblPosCdList] = useState<CmmCd[]>([]);
  
  const [formData, setFormData] = useState<Partial<Menu>>({
    siteId: 'a',
    menuUpSn: 0,
    menuNm: '',
    menuSeCd: 'MENU',
    menuHelpCn: '',
    sortSn: 1,
    useYn: 'Y',
    expsrYn: 'Y',
    menuPosCd: 'C002',
    moblUseYn: 'N',
    moblPosCd: ''
  });
  const [errors] = useState<Record<string, string>>({});
  const siteIdRef = useRef(formData.siteId);
  
  // 공통코드 조회
  useEffect(() => {
    const fetchCmmCds = async () => {
      try {
        setLoading(true);
        const cmmCdMap = await cmmCdApi.getCmmCdsByGroup();
        
        // 메뉴 구분 코드 (예: C000)
        if (cmmCdMap['U001']) {
          setMenuSeCdList(cmmCdMap['U001']);
        }
        
        // 메뉴 위치 코드 (예: C002)
        if (cmmCdMap['U002']) {
          setMenuPosCdList(cmmCdMap['U002']);
        }
        
        // 모바일 위치 코드 (예: MAIN)
        if (cmmCdMap['U003']) {
          setMoblPosCdList(cmmCdMap['U003']);
        }
      } catch (error) {
        console.error('공통코드 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCmmCds();
  }, []);
  
  // 메뉴 목록에서 특정 ID의 메뉴 찾기
  const findMenuById = useCallback((menus: Menu[], targetId: number): Menu | null => {
    for (const menu of menus) {
      if (menu.menuSn === targetId) {
        return menu;
      }
      
      if (menu.childMenus?.length > 0) {
        const found = findMenuById(menu.childMenus, targetId);
        if (found) return found;
      }
    }
    
    return null;
  }, []);
  
  // siteId가 변경될 때 ref 업데이트
  useEffect(() => {
    siteIdRef.current = formData.siteId;
  }, [formData.siteId]);
  
  // 메뉴 데이터 로드
  useEffect(() => {
    const fetchMenuData = async () => {
      if (!sn) {
        // sn이 없으면 목록으로 이동
        navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
        return;
      }
      
      try {
        setLoading(true);
        
        // 메뉴 목록 로드
        const menuListData = await menuApi.getMenuTreeList(siteIdRef.current || 'a');
        setMenuList(menuListData);
        
        // 현재 메뉴 정보 로드
        const menuDetail = await findMenuById(menuListData, sn);
        
        if (menuDetail) {
          setFormData(menuDetail);
        } else {
          alert('메뉴 정보를 찾을 수 없습니다.');
          navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
        }
      } catch (error) {
        console.error('메뉴 정보 조회 실패:', error);
        alert('메뉴 정보를 불러오는데 실패했습니다.');
        navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuData();
  }, [sn, navigate, findMenuById]);
  
  // 읽기 전용 메서드 - 입력 필드와 체크박스 변경은 허용하지 않음
  const handleInputChange = () => {
    // 읽기 전용이므로 아무 작업도 하지 않음
  };
  
  const handleCheckboxChange = () => {
    // 읽기 전용이므로 아무 작업도 하지 않음
  };
  
  // 수정 버튼 핸들러
  const handleEdit = () => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.EDIT, sn } });
  };
  
  // 목록 버튼 핸들러
  const handleList = () => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="메뉴 상세" 
        description="메뉴 정보를 확인합니다."
        buttons={[
          {
            label: "수정",
            onClick: handleEdit,
            variant: "primary",
            icon: "edit",
            size: "medium"
          },
          {
            label: "목록",
            onClick: handleList,
            variant: "primary",
            icon: "list",
            size: "medium"
          }
        ]}
      />
      
      <div className="pointer-events-none">
        <MenuForm
          formData={formData}
          onChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          errors={errors}
          menuList={menuList}
          menuSeCdList={menuSeCdList}
          menuPosCdList={menuPosCdList}
          moblPosCdList={moblPosCdList}
          loading={loading}
          isEdit={true}
        />
      </div>
    </PageContainer>
  );
};

export default MenuShowPage;

