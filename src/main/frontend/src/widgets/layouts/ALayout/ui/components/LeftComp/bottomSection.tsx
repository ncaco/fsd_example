import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import RenderMenuItem from './renderMenuItem';
import { authApi } from '@/features/auth/api/a_auth';
import { useNavigate } from 'react-router-dom';
import { User } from '@/types/a/user';
interface BottomSectionProps {
    isCollapsed: boolean,
    user: User | null,
}

export const BottomSection = ({ isCollapsed, user }: BottomSectionProps) => {
    const navigate = useNavigate();
    
    // 로그아웃
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            await authApi.a_logout();
            navigate('/a/login');
        } catch (error) {
            console.error('로그아웃 실패:', error);
        }
    };

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
                        to="#"
                        icon={<CreateIcon iconKey="logout" />}
                        label="로그아웃"
                        isCollapsed={isCollapsed}
                        onClick={handleLogout}
                    />

                    {/* 테스트 세션 표시 */}
                    <div>
                        <p>세션 정보</p>
                        <p>사용자 이메일: {user?.eml}</p>
                        <p>사용자 이름: {user?.nm}</p>
                        <p>사용자 번호: {user?.sn}</p>
                    </div>
                </nav>
            </div>
        </>
    )
}
export default BottomSection;
