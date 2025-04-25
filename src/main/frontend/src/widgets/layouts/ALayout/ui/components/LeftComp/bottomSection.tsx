
import RenderMenuItem from './renderMenuItem';

interface BottomSectionProps {
    isCollapsed: boolean,
}

export const BottomSection = ({ isCollapsed }: BottomSectionProps) => {
    return (
        <>
            <div className="flex-shrink-0 mt-4 border-t border-gray-200 pt-4">
                <nav className="space-y-1">
                    <RenderMenuItem
                        to="/a/settings"
                        icon={<svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>}
                        label="설정"
                        isCollapsed={isCollapsed}
                    />

                    <button 
                        className={`w-full text-left group flex items-center ${isCollapsed ? 'justify-center px-1' : 'px-3'} py-2 rounded-md text-gray-700 hover:bg-gray-100 hover:text-red-600`}
                    >
                        <div className="flex-shrink-0">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        {!isCollapsed && <span className="ml-3 truncate whitespace-nowrap">로그아웃</span>}
                    </button>
                </nav>
            </div>
        </>
    )
}
export default BottomSection;
