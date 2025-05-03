import React from 'react';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import { Menu } from '@/entities/menu';
import { Link, useLocation } from 'react-router-dom';


export const MobileBottomMenu: React.FC<{ menuList: Menu[] }> = ({ menuList }) => {
    const location = useLocation();
    
    // 현재 경로와 메뉴의 링크 URL이 일치하는지 확인하는 함수
    const isActive = (path: string) => {
        return location.pathname === path 
            ? 'flex flex-col items-center justify-center w-1/5 text-red-600 font-medium relative after:absolute after:w-full after:h-1 after:bg-red-600 after:bottom-[0px] after:rounded-t-md' 
            : 'flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600 transition-colors duration-200';
    };

    // 현재 경로와 메뉴의 링크 URL이 일치하는지 확인하는 함수
    const isActiveContent = (path: string) => {
        return location.pathname === path 
            ? 'flex flex-col items-center justify-center p-1 w-full bg-red-50 rounded-lg' 
            : 'flex flex-col items-center justify-center p-1 w-full';
    };

    return (
        // 하단에 고정되는 메뉴바
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden shadow-lg">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                
                {/* C001 ~ C004 각각에 대해 메뉴가 없으면 default 버튼으로 대체 */}
                {['C001', 'C002', 'PLUS', 'C003', 'C004'].map((posCd) => {
                    const menu = menuList.find(menu => menu.moblPosCd === posCd);
                    if (menu) {
                        const isActiveMenu = location.pathname === (menu.lnkgUrl || '');
                        return (
                            <Link
                                to={menu.lnkgUrl || ''}
                                key={menu.menuSn}
                                className={isActive(menu.lnkgUrl || '')}
                            >
                                <div className={isActiveContent(menu.lnkgUrl || '')}>
                                    <div className="flex justify-center items-center">
                                        <CreateIcon iconKey={menu.icon || 'default'} />
                                    </div>
                                    <span className={`mt-1 text-xs text-center w-full ${isActiveMenu ? 'font-bold' : ''}`}>
                                        {menu.menuNm}
                                    </span>
                                </div>
                            </Link>
                        );
                    }
                    else if (posCd === 'PLUS') {
                        return (
                            <button className="flex flex-col items-center justify-center w-1/5" key={`plus-button`}>
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-105 transition-transform duration-200">
                                    <CreateIcon iconKey="plus_white" />
                                </div>
                            </button>
                        );
                    }
                    else {
                        // default 버튼
                        return (
                            <Link
                                to={'#'}
                                key={`default-${posCd}`}
                                className="flex flex-col items-center justify-center w-1/5 text-gray-400 hover:text-gray-500 transition-colors duration-200"
                            >
                                <div className="flex flex-col items-center justify-center p-1 w-full">
                                    <div className="flex justify-center items-center">
                                        <CreateIcon iconKey="default" />
                                    </div>
                                    <span className="mt-1 text-xs text-center w-full">없음</span>
                                </div>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default MobileBottomMenu;

