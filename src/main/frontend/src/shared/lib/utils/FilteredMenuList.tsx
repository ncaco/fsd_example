import { Menu } from '@/entities/menu';

/**
 * 검색어로 메뉴 목록을 필터링하는 함수
 * @param menuList 필터링할 메뉴 목록
 * @param searchTerm 검색어
 * @returns 필터링된 메뉴 목록
 */
export const getFilteredMenus = (menuList: Menu[], searchTerm: string): Menu[] => {
  if (!searchTerm) return [...menuList];
  
  const searchTermLower = searchTerm.toLowerCase();
  
  // 깊은 복사로 새로운 메뉴 목록 생성
  const filteredMenus = menuList.map(menu => {
    const newMenu = { ...menu };
    
    // 현재 메뉴가 검색어에 맞는지 확인
    const menuMatches = 
      menu.menuNm.toLowerCase().includes(searchTermLower) || 
      (menu.menuHelpCn && menu.menuHelpCn.toLowerCase().includes(searchTermLower));
    
    // 자식 메뉴에서 검색
    if (menu.childMenus && menu.childMenus.length > 0) {
      newMenu.childMenus = getFilteredMenus(menu.childMenus, searchTerm);
      
      // 자식 메뉴가 없고 현재 메뉴도 검색어에 맞지 않으면 null 반환
      if (newMenu.childMenus.length === 0 && !menuMatches) {
        return null;
      }
    } else if (!menuMatches) {
      // 자식 메뉴가 없고 현재 메뉴도 검색어에 맞지 않으면 null 반환
      return null;
    }
    
    return newMenu;
  }).filter(Boolean) as Menu[]; // null 값 제거
  
  return filteredMenus;
};

export default getFilteredMenus; 