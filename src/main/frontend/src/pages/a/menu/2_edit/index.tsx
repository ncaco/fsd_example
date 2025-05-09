import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu } from '@/entities/menu';
import { menuApi } from '@/features/menu/api/menu';
import { PageContainer } from '@/widgets/layouts/ALayout';
import PageHeader from '@/shared/ui/pageHeader';
import { Spinner } from '@/shared/ui';

const MenuEditPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { sn } = location.state || {};
  
  const [loading, setLoading] = useState(false);
  const [menuList, setMenuList] = useState<Menu[]>([]);
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
        navigate('/a/menu/0_list');
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
          navigate('/a/menu/0_list');
        }
      } catch (error) {
        console.error('메뉴 정보 조회 실패:', error);
        alert('메뉴 정보를 불러오는데 실패했습니다.');
        navigate('/a/menu/0_list');
      } finally {
        setLoading(false);
      }
    };
    
    fetchMenuData();
  }, [sn, navigate, findMenuById]);
  
  // 입력 필드 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
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
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
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
    if (formData.menuSeCd === 'LINK' && !formData.lnkgUrl?.trim()) {
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
      navigate('/a/menu/0_list');
    } catch (error) {
      console.error('메뉴 수정 실패:', error);
      alert('메뉴 수정에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };
  
  // 취소 버튼 핸들러
  const handleCancel = () => {
    navigate('/a/menu/0_list');
  };
  
  // 삭제 버튼 핸들러
  const handleDelete = async () => {
    if (!sn) return;
    
    if (window.confirm('정말로 이 메뉴를 삭제하시겠습니까?')) {
      try {
        setLoading(true);
        await menuApi.deleteMenu(sn);
        alert('메뉴가 성공적으로 삭제되었습니다.');
        navigate('/a/menu/0_list');
      } catch (error) {
        console.error('메뉴 삭제 실패:', error);
        alert('메뉴 삭제에 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }
  };
  
  // 상위 메뉴 옵션 생성
  const renderMenuOptions = (menus: Menu[], level = 0) => {
    return menus.map(menu => {
      // 현재 수정 중인 메뉴와 그 자식 메뉴들은 상위 메뉴로 선택할 수 없음
      if (menu.menuSn === sn) return null;
      
      return (
        <React.Fragment key={menu.menuSn}>
          <option value={menu.menuSn}>
            {'-'.repeat(level)} {menu.menuNm}
          </option>
          {menu.childMenus?.length > 0 && renderMenuOptions(menu.childMenus, level + 1)}
        </React.Fragment>
      );
    });
  };
  
  // 필드 에러 메시지 표시 컴포넌트
  const ErrorMessage = ({ name }: { name: string }) => {
    if (!errors[name]) return null;
    return <p className="mt-1 text-sm text-red-600">{errors[name]}</p>;
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
            label: "저장",
            onClick: handleSave,
            variant: "primary",
            icon: "edit",
            size: "medium"
          },
          {
            label: "삭제",
            onClick: handleDelete,
            variant: "danger",
            icon: "delete",
            size: "medium"
          },
          {
            label: "목록",
            onClick: handleCancel,
            variant: "primary",
            icon: "edit",
            size: "medium"
          }
        ]}
      />
      
      {loading ? (
        <Spinner size="lg" color="primary" label="처리 중입니다..." fullPage={true} />
      ) : (
        <div className="bg-gray-50 p-4 rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 기본 정보 카드 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">기본 정보</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* 메뉴 일련번호 (비활성화) */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">메뉴 일련번호</label>
                    <input
                      type="text"
                      value={sn || ''}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>
                
                  {/* 사이트 정보 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      사이트 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="siteId"
                      value={formData.siteId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="home">홈</option>
                      <option value="a">관리자</option>
                    </select>
                    <ErrorMessage name="siteId" />
                  </div>
                  
                  {/* 상위 메뉴 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">상위 메뉴</label>
                    <select
                      name="menuUpSn"
                      value={formData.menuUpSn}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value={0}>최상위 메뉴</option>
                      {renderMenuOptions(menuList)}
                    </select>
                    <ErrorMessage name="menuUpSn" />
                  </div>
                  
                  {/* 메뉴명 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      메뉴명 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="menuNm"
                      value={formData.menuNm}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.menuNm ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    <ErrorMessage name="menuNm" />
                  </div>
                  
                  {/* 메뉴 구분 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      메뉴 구분 <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="menuSeCd"
                      value={formData.menuSeCd}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      required
                    >
                      <option value="MENU">일반 메뉴</option>
                      <option value="LINK">링크</option>
                      <option value="BOARD">게시판</option>
                      <option value="CONTENT">콘텐츠</option>
                    </select>
                    <ErrorMessage name="menuSeCd" />
                  </div>
                  
                  {/* 정렬 순서 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">정렬 순서</label>
                    <input
                      type="number"
                      name="sortSn"
                      value={formData.sortSn}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      min="1"
                    />
                    <ErrorMessage name="sortSn" />
                  </div>
                </div>
              </div>
            </div>
            
            {/* 상세 정보 카드 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">상세 정보</h3>
              </div>
              <div className="p-6">
                {/* 메뉴 설명 */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">메뉴 설명</label>
                  <textarea
                    name="menuHelpCn"
                    value={formData.menuHelpCn || ''}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="메뉴에 대한 설명을 입력하세요."
                  />
                  <ErrorMessage name="menuHelpCn" />
                </div>
                
                {/* 링크 URL (menuSeCd가 LINK인 경우만) */}
                {formData.menuSeCd === 'LINK' && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">
                      링크 URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lnkgUrl"
                      value={formData.lnkgUrl || ''}
                      onChange={handleInputChange}
                      className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 ${
                        errors.lnkgUrl ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="https://"
                    />
                    <ErrorMessage name="lnkgUrl" />
                  </div>
                )}
                
                {/* 메뉴 위치 (윈도우) */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">윈도우 메뉴 위치</label>
                  <select
                    name="menuPosCd"
                    value={formData.menuPosCd}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="C002">좌측</option>
                    <option value="C003">우측</option>
                    <option value="C004">하단</option>
                  </select>
                  <ErrorMessage name="menuPosCd" />
                </div>
              </div>
            </div>
            
            {/* 옵션 설정 카드 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">옵션 설정</h3>
              </div>
              <div className="p-6">
                {/* 체크박스 그룹 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <input
                      id="useYn"
                      name="useYn"
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.useYn === 'Y'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="useYn" className="ml-3 block text-sm text-gray-700">
                      사용 여부
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <input
                      id="expsrYn"
                      name="expsrYn"
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.expsrYn === 'Y'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="expsrYn" className="ml-3 block text-sm text-gray-700">
                      노출 여부
                    </label>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                    <input
                      id="moblUseYn"
                      name="moblUseYn"
                      type="checkbox"
                      className="h-5 w-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                      checked={formData.moblUseYn === 'Y'}
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="moblUseYn" className="ml-3 block text-sm text-gray-700">
                      모바일 사용 여부
                    </label>
                  </div>
                </div>
                
                {/* 모바일 메뉴 위치 (moblUseYn가 Y인 경우만) */}
                {formData.moblUseYn === 'Y' && (
                  <div className="border-t border-gray-200 pt-4">
                    <label className="block text-sm font-medium text-gray-700">모바일 메뉴 위치</label>
                    <select
                      name="moblPosCd"
                      value={formData.moblPosCd}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="MAIN">메인</option>
                      <option value="TOP">상단</option>
                      <option value="BOTTOM">하단</option>
                    </select>
                    <ErrorMessage name="moblPosCd" />
                  </div>
                )}
              </div>
            </div>
            
            {/* 등록 정보 카드 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <h3 className="text-lg font-medium text-gray-900">등록 정보</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">등록자</label>
                    <input
                      type="text"
                      value={formData.rgtrId || ''}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">등록일시</label>
                    <input
                      type="text"
                      value={formData.regDt || ''}
                      disabled
                      className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                    />
                  </div>
                  {formData.mdfrId && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">수정자</label>
                        <input
                          type="text"
                          value={formData.mdfrId || ''}
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">수정일시</label>
                        <input
                          type="text"
                          value={formData.mdfcnDt || ''}
                          disabled
                          className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </PageContainer>
  );
};

export default MenuEditPage;

