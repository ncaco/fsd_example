import { useEffect, useState } from 'react';
import { checkLoginStatus } from '@/shared/api/session';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await checkLoginStatus();
        setIsAuthenticated(response.isLoggedIn);
      } catch (error) {
        console.error('인증 상태 확인 중 오류 발생:', error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  return { isAuthenticated, isLoading };
} 