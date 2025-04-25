import React from 'react';
import { CreateIcon } from '@/shared/ui/icon/CreateIcon';

export const MobileBottomMenu: React.FC = () => {
    return (
        // 하단에 고정되는 메뉴바
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 md:hidden">
            <div className="flex items-center justify-between max-w-screen-xl mx-auto">
                {/* 홈 */}
                <button className="flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600">
                    <CreateIcon iconKey="home" />
                    <span className="mt-1 text-xs">홈</span>
                </button>

                {/* 검색 */}
                <button className="flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600">
                    <CreateIcon iconKey="search" />
                    <span className="mt-1 text-xs">검색</span>
                </button>

                {/* 추가 버튼 (가운데 메인 버튼) */}
                <button className="flex flex-col items-center justify-center w-1/5">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg">
                        <CreateIcon iconKey="plus" />
                    </div>
                </button>

                {/* 즐겨찾기 */}
                <button className="flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600">
                    <CreateIcon iconKey="favorite" />
                    <span className="mt-1 text-xs">즐겨찾기</span>
                </button>

                {/* 마이페이지 */}
                <button className="flex flex-col items-center justify-center w-1/5 text-gray-600 hover:text-red-600">
                    <CreateIcon iconKey="mypage" />
                    <span className="mt-1 text-xs">마이페이지</span>
                </button>
            </div>
        </div>
    );
};

export default MobileBottomMenu;

