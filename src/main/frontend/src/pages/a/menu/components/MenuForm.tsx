import React from 'react';
import { Menu } from '@/entities/menu';
import { CmmCd } from '@/entities';
import { Spinner } from '@/shared/ui';

export interface MenuFormProps {
  formData: Partial<Menu>;
  onChange: (name: string, value: string | number) => void;
  onCheckboxChange: (name: string, checked: boolean) => void;
  errors: Record<string, string>;
  menuList: Menu[];
  menuSeCdList: CmmCd[];
  menuPosCdList: CmmCd[];
  moblPosCdList: CmmCd[];
  loading: boolean;
  isEdit?: boolean;
}

const MenuForm: React.FC<MenuFormProps> = ({
  formData,
  onChange,
  onCheckboxChange,
  errors,
  menuList,
  menuSeCdList,
  menuPosCdList,
  moblPosCdList,
  loading,
  isEdit = false
}) => {
  
  // 필드 에러 메시지 표시 컴포넌트
  const ErrorMessage = ({ name }: { name: string }) => {
    if (!errors[name]) return null;
    return <p className="mt-1 text-sm text-red-600">{errors[name]}</p>;
  };
  
  // 상위 메뉴 옵션 생성
  const renderMenuOptions = (menus: Menu[], level = 0) => {
    if (isEdit) {
      // 수정 페이지에서는 현재 메뉴와 그 자식 메뉴들은 상위 메뉴로 선택할 수 없음
      return menus.map(menu => {
        if (menu.menuSn === formData.menuSn) return null;
        
        return (
          <React.Fragment key={menu.menuSn}>
            <option value={menu.menuSn}>
              {'-'.repeat(level)} {menu.menuNm}
            </option>
            {menu.childMenus?.length > 0 && renderMenuOptions(menu.childMenus, level + 1)}
          </React.Fragment>
        );
      });
    } else {
      // 등록 페이지에서는 모든 메뉴를 상위 메뉴로 선택 가능
      return menus.filter(menu => menu.menuSeCd === 'C004').map(menu => (
        <React.Fragment key={menu.menuSn}>
          <option value={menu.menuSn}>
            {'-'.repeat(level)} {menu.menuNm}
          </option>
          {menu.childMenus?.length > 0 && renderMenuOptions(menu.childMenus, level + 1)}
        </React.Fragment>
      ));
    }
  };
  
  // 공통코드 옵션 렌더링 함수
  const renderCmmCdOptions = (cmmCdList: CmmCd[]) => {
    if (!cmmCdList || cmmCdList.length === 0) {
      return null;
    }
    
    return cmmCdList.map(cmmCd => (
      <option key={cmmCd.cmmCd} value={cmmCd.cmmCd}>
        {cmmCd.cmmCdNm}
      </option>
    ));
  };
  
  if (loading) {
    return <Spinner size="lg" color="primary" label="처리 중입니다..." fullPage={true} />;
  }
  
  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="space-y-8">
        {/* 기본 정보 카드 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
            <h3 className="text-lg font-medium text-gray-900">기본 정보</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 메뉴 일련번호 (수정 시에만 표시) */}
              {isEdit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">메뉴 일련번호</label>
                  <input
                    type="text"
                    value={formData.menuSn || ''}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 shadow-sm"
                  />
                </div>
              )}
              
              {/* 사이트 정보 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  사이트 <span className="text-red-500">*</span>
                </label>
                <select
                  name="siteId"
                  value={formData.siteId}
                  onChange={(e) => onChange('siteId', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="home">홈(home)</option>
                  <option value="a">관리자(a)</option>
                </select>
                <ErrorMessage name="siteId" />
              </div>
              
              {/* 상위 메뉴 */}
              <div>
                <label className="block text-sm font-medium text-gray-700">상위 메뉴</label>
                <select
                  name="menuUpSn"
                  value={formData.menuUpSn}
                  onChange={(e) => onChange('menuUpSn', e.target.value)}
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
                  value={formData.menuNm || ''}
                  onChange={(e) => onChange('menuNm', e.target.value)}
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
                  onChange={(e) => onChange('menuSeCd', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  {renderCmmCdOptions(menuSeCdList)}
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
                  onChange={(e) => onChange('sortSn', e.target.value)}
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
                onChange={(e) => onChange('menuHelpCn', e.target.value)}
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="메뉴에 대한 설명을 입력하세요."
              />
              <ErrorMessage name="menuHelpCn" />
            </div>
            
            {/* 링크 URL (menuSeCd가 LINK인 경우만) */}
            {formData.menuSeCd === 'C001' && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  링크 URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lnkgUrl"
                  value={formData.lnkgUrl || ''}
                  onChange={(e) => onChange('lnkgUrl', e.target.value)}
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
                onChange={(e) => onChange('menuPosCd', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                {renderCmmCdOptions(menuPosCdList)}
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
                  onChange={(e) => onCheckboxChange('useYn', e.target.checked)}
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
                  onChange={(e) => onCheckboxChange('expsrYn', e.target.checked)}
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
                  onChange={(e) => onCheckboxChange('moblUseYn', e.target.checked)}
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
                  onChange={(e) => onChange('moblPosCd', e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {renderCmmCdOptions(moblPosCdList)}
                </select>
                <ErrorMessage name="moblPosCd" />
              </div>
            )}
          </div>
        </div>
        
        {/* 등록 정보 카드 (수정 시에만 표시) */}
        {isEdit && formData.regDt && (
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
        )}
      </div>
    </div>
  );
};

export default MenuForm; 