
interface TopLogoProps {
    isCollapsed: boolean,
}

export const TopLogo = ({ isCollapsed }: TopLogoProps) => {
    return (
        <>
            <div className="flex-shrink-0 mb-8 flex justify-center">
                <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'}`}>
                    <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center">
                        <span className="font-bold text-sm text-white">FSD</span>
                    </div>
                    {!isCollapsed && <span className="ml-3 text-xl font-semibold text-gray-900 truncate whitespace-nowrap">아키텍처</span>}
                </div>
            </div>
        </>
    )
}
export default TopLogo;
