import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from '@/entities/menu';
import { menuApi } from '@/features/menu/api/menu';
import { cmmCdApi } from '@/features/cmmCd/api/cmmCd';
import { CmmCd } from '@/entities';
import { PageContainer } from '@/widgets/layouts/ALayout';
import PageHeader from '@/shared/ui/pageHeader';
import MenuForm from '../components/MenuForm';
import { PAGE_MODES } from '@/shared/lib/utils/routingUtils';

const MenuCreatePage: React.FC = () => {
  const navigate = useNavigate();
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
    menuPosCd: 'C002',  // 기본값: 좌측
    moblUseYn: 'N',     // 모바일 사용 여부 기본값은 N
    moblPosCd: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
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
  
  // 메뉴 목록 조회
  useEffect(() => {
    const fetchMenuList = async () => {
      try {
        setLoading(true);
        const data = await menuApi.getMenuTreeList(formData.siteId || 'a');
        setMenuList(data);
      } catch (error) {
        console.error('메뉴 목록 조회 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuList();
  }, [formData.siteId]);
  
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
  
  // 메뉴 생성 요청
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      setLoading(true);
      await menuApi.createMenu(formData as Menu);
      alert('메뉴가 성공적으로 등록되었습니다.');
      navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
    } catch (error) {
      console.error('메뉴 등록 실패:', error);
      alert('메뉴 등록에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate('/a/menu', { state: { pgMode: PAGE_MODES.LIST } });
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
        title="메뉴 등록" 
        description="새로운 메뉴를 등록합니다."
        buttons={[
          {
            label: "저장",
            onClick: handleSave,
            variant: "primary",
            icon: "plus",
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
        />
      </form>
    </PageContainer>
  );
};

export default MenuCreatePage;

