import { Link } from 'react-router-dom';

export const Header = () => {
    return (
        <>
            {/* 메인 콘텐츠 - 유동적 너비, 전체 높이, 내부 스크롤 */}
            <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200 bg-gradient-to-r  min-h-[48px]" >
                {/* 오른쪽: 공간 확보용(정렬용) */}
                <div className="w-9 h-6" />

                {/* 가운데: 제품명 */}
                <div className="flex-1 flex justify-center" >
                    <Link to="/a" className="flex items-center">
                        <h2 className="text-lg font-bold text-red-600 cursor-pointer">Feature-Sliced Design</h2>
                    </Link>
                </div>

                {/* 왼쪽: 알림 버튼 */}
                <button
                    type="button"
                    className="flex items-center justify-center w-9 h-9 rounded-md hover:bg-red-600 transition-colors text-red-600 hover:text-white"
                    aria-label="알림"
                >
                    {/* 간단한 벨 아이콘 (SVG) */}
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </button>
            </header>
        </>
    )
}

export default Header;
