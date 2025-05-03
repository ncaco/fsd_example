import { Link } from 'react-router-dom';

interface TopLogoProps {
    isCollapsed: boolean,
}

export const TopLogo = ({ isCollapsed }: TopLogoProps) => {
    return (
        <>
            <Link to="/a" className={`flex-shrink-0 py-4 flex ${isCollapsed ? 'justify-center' : 'items-center'} justify-center border-b border-gray-200 cursor-pointer group`} tabIndex={0}>
                <div className="w-10 h-10 rounded bg-red-600 flex items-center justify-center group-hover:bg-red-700 transition-colors">
                    <span className="font-bold text-sm text-white">FSD</span>
                </div>
                {!isCollapsed && <span className="ml-3 text-xl font-semibold text-gray-900 truncate whitespace-nowrap">아키텍처</span>}
            </Link>
        </>
    )
}
export default TopLogo;
