import { useEffect, useState } from 'react';
import { apiInstance } from '@/shared/api';

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiInstance.get('/a/auth/session-info');
        setIsAuthenticated(response.data.isLoggedIn);
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