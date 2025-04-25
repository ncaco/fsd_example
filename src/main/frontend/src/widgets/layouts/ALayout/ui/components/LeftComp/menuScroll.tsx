import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import RenderMenuItem from './renderMenuItem';

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

    useEffect(() => {
        console.log('-----LeftMenu useEffect-----');
        
        const menuList = [
            { to: '/a/sub1', icon: <CreateIcon iconKey="start" />, label: '시작하기' },
            { to: '/a/sub2', icon: <CreateIcon iconKey="example" />, label: '예제' },
            { to: '/a/sub3', icon: <CreateIcon iconKey="user" />, label: '사용자' },
            { to: '/a/sub4', icon: <CreateIcon iconKey="document" />, label: '문서' },
            { to: '/a/sub5', icon: <CreateIcon iconKey="setting" />, label: '설정' },
            { to: '/a/sub6', icon: <CreateIcon iconKey="event" />, label: '이벤트' },
        ]
    
        setMenuList(menuList);
    }, []);

    return (
        <>
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
                {/* 문서 메뉴 그룹 */}
                <div className="mb-6">
                    <nav className="space-y-1">
                        {menuList.map((menu) => (
                            <RenderMenuItem
                                key={uuidv4()}
                                to={menu.to}
                                icon={menu.icon}
                                label={menu.label}
                                isCollapsed={isCollapsed}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </>
    )
}
export default MenuScroll;
