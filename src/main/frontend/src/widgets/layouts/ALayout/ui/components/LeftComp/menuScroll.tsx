import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import RenderMenuItem from './renderMenuItem';
import { menuApi } from '@/features/menu/api/menu';

interface MenuItem {
    to: string;
    icon: React.ReactNode;
    label: string;
}

interface MenuScrollProps {
    isCollapsed: boolean;
}

export const MenuScroll = ({ isCollapsed }: MenuScrollProps) => {
    console.log('-----MenuScroll Rendered-----');
    
    const [menuList, setMenuList] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('-----MenuScroll useEffect-----');
        
        const fetchMenus = async () => {
            try {
                setLoading(true);
                const menus = await menuApi.getMenuList();
                
                // API에서 받아온 메뉴 데이터를 MenuItem 형식으로 변환
                const formattedMenus = menus.map(menu => ({
                    to: menu.menuUrl,
                    icon: <CreateIcon iconKey={menu.menuIcon || "default"} />,
                    label: menu.menuName
                }));
                
                setMenuList(formattedMenus);
            } catch (error) {
                console.error('메뉴 목록을 불러오는 중 오류가 발생했습니다:', error);
                // 오류 발생 시 기본 메뉴 표시
                const fallbackMenus: MenuItem[] = [];
                setMenuList(fallbackMenus);
            } finally {
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                {/* 문서 메뉴 그룹 */}
                <div className="mb-6">
                    <nav className="space-y-1">
                        {loading ? (
                            <div className="flex items-center justify-center py-2 px-4">
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
                            </div>
                        ) : (
                            menuList.map((menu) => (
                                <RenderMenuItem
                                    key={uuidv4()}
                                    to={menu.to}
                                    icon={menu.icon}
                                    label={menu.label}
                                    isCollapsed={isCollapsed}
                                />
                            ))
                        )}
                    </nav>
                </div>
            </div>
        </>
    )
}
export default MenuScroll;
