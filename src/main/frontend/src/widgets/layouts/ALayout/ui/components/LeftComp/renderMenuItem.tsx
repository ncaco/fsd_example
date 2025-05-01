import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface RenderMenuItemProps {
    to: string,
    icon: React.ReactNode,
    label: string,
    isCollapsed: boolean,
    onClick?: (e: React.MouseEvent) => void,
}

const RenderMenuItem = ({ to, icon, label, isCollapsed, onClick }: RenderMenuItemProps) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path 
        ? 'bg-red-600 text-white font-medium' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-red-600';
    };
    
    // 접힌 상태일 때 라벨 처리
    const getTruncatedLabel = (text: string) => {
        if (text.length <= 7) return text;
        return text.substring(0, 7) + '...';
    };
    
    return (
        <Link 
            to={to} 
            className={`group flex ${isCollapsed ? 'flex-col items-center justify-center px-1' : 'flex-row items-center px-3'} py-2 rounded-md ${isActive(to)}`}
            title={isCollapsed ? label : ""}
            onClick={onClick}
        >
            <div className="flex-shrink-0">{icon}</div>
            {isCollapsed ? (
                <span className="text-[10px] mt-1 text-center w-full overflow-hidden">
                    {getTruncatedLabel(label)}
                </span>
            ) : (
                <span className="ml-3 truncate whitespace-nowrap">{label}</span>
            )}
        </Link>
    );
};

export default RenderMenuItem;