import React from 'react';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import { Menu } from '@/entities/menu';

export const MobileBottomMenu: React.FC<{ menuList: Menu[] }> = ({ menuList }) => {
    return (
        // 하단에 고정되는 메뉴바
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                
                {/* C001 ~ C004 각각에 대해 메뉴가 없으면 default 버튼으로 대체 */}
                {['C001', 'C002', 'PLUS', 'C003', 'C004'].map((posCd) => {
                    const menu = menuList.find(menu => menu.moblPosCd === posCd);
                    if (menu) {
                        return (
                            <button
                                key={menu.menuSn}
                                className="flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600"
                            >
                                <CreateIcon iconKey={menu.icon || 'default'} />
                                <span className="mt-1 text-xs">{menu.menuNm}</span>
                            </button>
                        );
                    }
                    else if (posCd === 'PLUS') {
                        return (
                            <button className="flex flex-col items-center justify-center w-1/5">
                                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                                    <CreateIcon iconKey="plus" />
                                </div>
                            </button>
                        );
                    }
                    else {
                        // default 버튼
                        return (
                            <button
                                key={`default-${posCd}`}
                                className="flex flex-col items-center justify-center w-1/5 text-gray-400"
                                disabled
                            >
                                <CreateIcon iconKey="default" />
                                <span className="mt-1 text-xs">기본</span>
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default MobileBottomMenu;

