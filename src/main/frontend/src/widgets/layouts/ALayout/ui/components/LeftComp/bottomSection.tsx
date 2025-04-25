import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
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
                        icon={<CreateIcon iconKey="setting" />}
                        label="설정"
                        isCollapsed={isCollapsed}
                    />
                    
                    <RenderMenuItem 
                        to="/a/logout"
                        icon={<CreateIcon iconKey="logout" />}
                        label="로그아웃"
                        isCollapsed={isCollapsed}
                    />
                </nav>
            </div>
        </>
    )
}
export default BottomSection;
