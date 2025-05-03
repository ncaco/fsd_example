import { v4 as uuidv4 } from 'uuid';
import RenderMenuItem from './renderMenuItem';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import { Menu } from '@/entities/menu';

interface MenuScrollProps {
    menuList: Menu[];
    isCollapsed: boolean;
    loading: boolean;
}

export const MenuScroll = ({ menuList, isCollapsed, loading }: MenuScrollProps) => {
    console.log('-----MenuScroll Rendered-----');
    
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
                            menuList.map((menu: Menu) => (
                                <RenderMenuItem
                                    key={uuidv4()}
                                    to={menu.lnkgUrl || ''}
                                    icon={<CreateIcon iconKey={menu.icon || 'default'} />}
                                    label={menu.menuNm}
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
