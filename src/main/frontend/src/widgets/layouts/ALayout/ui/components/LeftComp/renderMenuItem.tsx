import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

interface RenderMenuItemProps {
    to: string,
    icon: React.ReactNode,
    label: string,
    isCollapsed: boolean,
}

const RenderMenuItem = ({ to, icon, label, isCollapsed }: RenderMenuItemProps) => {
    const location = useLocation();

    const isActive = (path: string) => {
        return location.pathname === path 
        ? 'bg-red-600 text-white font-medium' 
        : 'text-gray-700 hover:bg-gray-100 hover:text-red-600';
    };
    
    return (
        <Link 
            to={to} 
            className={`group flex items-center ${isCollapsed ? 'justify-center px-1' : 'px-3'} py-2 rounded-md ${isActive(to)}`}
            title={isCollapsed ? label : ""}
        >
            <div className="flex-shrink-0">{icon}</div>
            {!isCollapsed && <span className="ml-3 truncate whitespace-nowrap">{label}</span>}
        </Link>
    );
};

export default RenderMenuItem;