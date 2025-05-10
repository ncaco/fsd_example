import apiInstance from '@/shared/api';
import { User } from '@/entities/user';

export interface LoginRequest {
  eml: string;
  pswd: string;
}

// 타이머를 위한 전역 변수 선언
declare global {
  interface Window {
    autoLogoutTimer: NodeJS.Timeout | undefined;
  }
}

function saveSession(user: User) {
  // 토큰이 없는 경우(로그인 실패) 저장하지 않음
  if (!user.token) {
    return;
  }
  
  // 로컬스토리지 대신 세션스토리지 사용
  sessionStorage.setItem('token', user.token);
  sessionStorage.setItem('refreshToken', user.refreshToken);
  sessionStorage.setItem('user', JSON.stringify(user));
  
  // 로그인 만료 시간 설정 (30분)
  const expirationTime = new Date(new Date().getTime() + 30 * 60 * 1000);
  sessionStorage.setItem('sessionExpiration', expirationTime.toISOString());
  
  // 자동 로그아웃 타이머 설정
  setAutoLogoutTimer();
}

function clearSession() {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('refreshToken');
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('sessionExpiration');
}

// 자동 로그아웃 타이머 설정
function setAutoLogoutTimer() {
  // 기존 타이머가 있으면 제거
  if (window.autoLogoutTimer) {
    clearTimeout(window.autoLogoutTimer);
  }
  
  const expirationTime = sessionStorage.getItem('sessionExpiration');
  if (!expirationTime) return;
  
  const remainingTime = new Date(expirationTime).getTime() - new Date().getTime();
  if (remainingTime <= 0) {
    // 세션이 이미 만료된 경우
    clearSession();
    return;
  }
  
  // 남은 시간 후에 자동 로그아웃
  window.autoLogoutTimer = setTimeout(() => {
    authApi.logout();
    // 필요한 경우 로그아웃 후 리다이렉션 로직 추가
    window.location.href = '/a/login';
  }, remainingTime);
}

// 페이지 로드 시 세션 유효성 확인 및 타이머 설정
window.addEventListener('load', () => {
  const expirationTime = sessionStorage.getItem('sessionExpiration');
  if (expirationTime && new Date(expirationTime) > new Date()) {
    setAutoLogoutTimer();
  } else if (expirationTime) {
    clearSession();
  }
});

export const authApi = {
  login: async (data: LoginRequest): Promise<User> => {
    try {
      const response = await apiInstance.post<User>('/a/auth/login', data);
      if (response.data && response.data.token) {
        saveSession(response.data);
      }
      return response.data;
    } catch {
      console.warn('로그인 요청 실패');
      // User 인터페이스의 실제 타입에 맞춘 객체 생성
      const emptyUser = {
        sn: 0,
        nm: '',
        eml: '',
        pswd: '',
        token: '',
        refreshToken: '',
        status: false,
        statusCode: 401,
        message: '로그인 실패'
      };
      return emptyUser as User;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiInstance.post('/a/auth/logout');
    } catch {
      console.warn('로그아웃 요청 실패');
    } finally {
      clearSession();
    }
  },

  sessionInfo: async (): Promise<User> => {
    try {
      const response = await apiInstance.get<User>('/a/auth/session-info');
      return response.data;
    } catch (error) {
      console.warn('세션 정보 요청 실패');
      throw error;
    }
  },

  refreshToken: async (): Promise<User> => {
    try {
      const refreshToken = sessionStorage.getItem('refreshToken');
      if (!refreshToken) {
        throw new Error('리프레시 토큰이 없습니다');
      }
      
      const response = await apiInstance.post<User>('/a/auth/refresh', { refreshToken });
      saveSession(response.data);
      return response.data;
    } catch (error) {
      console.warn('토큰 갱신 실패');
      throw error;
    }
  },
  
  register: async (data: {
    nm: string;
    eml: string;
    pswd: string;
  }): Promise<{ message: string }> => {
    try {
      const response = await apiInstance.post('/a/auth/register', data);
      return response.data;
    } catch (error) {
      console.warn('회원가입 요청 실패');
      throw error;
    }
  },

  // 데모 계정 조회
  demoAccount: async (): Promise<User> => {
    try {
      const response = await apiInstance.get<User>('/a/auth/demo-account');
      return response.data;
    } catch (error) {
      console.warn('데모 계정 조회 실패');
      throw error;
    }
  }
}; 