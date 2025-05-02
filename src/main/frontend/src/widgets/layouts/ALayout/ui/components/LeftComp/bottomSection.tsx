import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import RenderMenuItem from './renderMenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logout } from '@/features/auth/authSlice';
import { AppDispatch } from '@/app/store';
import { CustomToast } from '@/shared/ui/toaster';
import { Menu } from '@/entities/menu';
interface BottomSectionProps {
    menuList: Menu[],
    isCollapsed: boolean,
    loading: boolean,
}

export const BottomSection = ({ menuList, isCollapsed, loading }: BottomSectionProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    console.log(menuList);
    console.log(isCollapsed);
    console.log(loading);

    // 로그아웃
    const handleLogout = useCallback(async (e: React.MouseEvent) => {
        e.preventDefault();
        try {
            // Redux 액션 디스패치
            await dispatch(logout()).unwrap();
            
            // 로컬 스토리지에서 직접 세션 정보 삭제 (중복 삭제로 확실하게)
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
            
            CustomToast.success('로그아웃 되었습니다.');
            
            // 로그인 페이지로 강제 이동 (replace 옵션으로 뒤로 가기 불가능하게)
            navigate('/a/login', { replace: true });
            
            // 페이지 새로고침 (모든 Redux 상태 초기화)
            //window.location.reload();
        } catch (error) {
            console.error('로그아웃 실패:', error);
            CustomToast.error('로그아웃에 실패했습니다.');
        }
    }, [dispatch, navigate]);

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
                </nav>
            </div>
        </>
    )
}
export default BottomSection;
