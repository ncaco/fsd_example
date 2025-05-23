import { CreateIcon } from '@/shared/ui/icon/CreateIcon';
import RenderMenuItem from './renderMenuItem';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { logout } from '@/features/auth/authSlice';
import { AppDispatch } from '@/app/store';
import { CustomToast } from '@/shared/ui/toaster';
import { Menu } from '@/entities/menu';
import { v4 as uuidv4 } from 'uuid';
interface BottomSectionProps {
    menuList: Menu[],
    isCollapsed: boolean,
    loading: boolean,
}

export const BottomSection = ({ menuList, isCollapsed, loading }: BottomSectionProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    // 로그아웃
    const handleLogout = useCallback(async (e: React.MouseEvent, lnkgUrl: string) => {
        e.preventDefault();
        try {
            // Redux 액션 디스패치
            await dispatch(logout()).unwrap();

            // 세션 스토리지에서 직접 세션 정보 삭제 (중복 삭제로 확실하게)
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('refreshToken');
            sessionStorage.removeItem('user');

            CustomToast.success('로그아웃 되었습니다.');

            // 로그인 페이지로 강제 이동 (replace 옵션으로 뒤로 가기 불가능하게)
            navigate(lnkgUrl, { replace: true });

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
                    {loading ? (
                        <div className="flex items-center justify-center py-2 px-4">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
                        </div>
                    ) : (
                        menuList.map((menu: Menu) => (
                            <RenderMenuItem
                                key={uuidv4()}
                                to={menu.lnkgUrl || ''}
                                icon={<CreateIcon iconKey={menu.icon || 'default'} />}
                                label={menu.menuNm}
                                isCollapsed={isCollapsed}
                                onClick={menu.lnkgUrl?.includes('logout') ? (e: React.MouseEvent) => handleLogout(e, menu.lnkgUrl || '') : undefined}
                            />
                        ))
                    )}
                </nav>
            </div>
        </>
    )
}
export default BottomSection;
