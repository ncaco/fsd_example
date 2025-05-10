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

const MenuEditPage: React.FC = () => {
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
  const [errors, setErrors] = useState<Record<string, string>>({});
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
  
  // 입력 필드 변경 핸들러
  const handleInputChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // 필드 변경 시 해당 필드의 에러 메시지 제거
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // 체크박스 변경 핸들러
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked ? 'Y' : 'N' }));
  };
  
  // 폼 유효성 검증
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // 필수 필드 검증
    if (!formData.menuNm?.trim()) {
      newErrors.menuNm = '메뉴명은 필수 입력 항목입니다.';
    }
    
    // 링크 URL 검증 (LINK 유형인 경우)
    if (formData.menuSeCd === 'C001' && !formData.lnkgUrl?.trim()) {
      newErrors.lnkgUrl = '링크 유형의 메뉴는 URL을 반드시 입력해야 합니다.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // 메뉴 수정 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (!sn) {
      alert('수정할 메뉴 정보가 없습니다.');
      return;
    }
    
    try {
      setLoading(true);
      await menuApi.updateMenu(sn, formData as Menu);
      alert('메뉴가 성공적으로 수정되었습니다.');
      navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
      alert('메뉴 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
  };
  
  // 삭제 버튼 핸들러
  const handleDelete = async () => {
    if (!sn) return;
    
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await menuApi.deleteMenu(sn);
        alert('메뉴가 성공적으로 삭제되었습니다.');
        navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
      } catch (error) {
        console.error('메뉴 삭제 실패:', error);
        alert('메뉴 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // 저장 버튼 핸들러 (페이지 헤더용)
  const handleSave = () => {
    const form = document.querySelector('form');
    if (form) {
      form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="메뉴 수정" 
        description="메뉴 정보를 수정합니다."
        buttons={[
          {
            label: "삭제",
            onClick: handleDelete,
            variant: "primary",
            icon: "delete",
            size: "medium"
          },
          {
            label: "저장",
            onClick: handleSave,
            variant: "primary",
            icon: "edit",
            size: "medium"
          },
          {
            label: "목록",
            onClick: handleCancel,
            variant: "primary",
            icon: "list",
            size: "medium"
          }
        ]}
      />
      
      <form onSubmit={handleSubmit}>
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
      </form>
    </PageContainer>
  );
};

export default MenuEditPage;

