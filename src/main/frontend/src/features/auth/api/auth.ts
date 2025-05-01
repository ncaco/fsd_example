import apiInstance from '@/shared/api';
import { User } from '@/entities/user';

export interface LoginRequest {
  eml: string;
  pswd: string;
}

function saveSession(user: User) {
  localStorage.setItem('token', user.token);
  localStorage.setItem('refreshToken', user.refreshToken);
  localStorage.setItem('user', JSON.stringify(user));
}

function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
}

export const authApi = {
  login: async (data: LoginRequest): Promise<User> => {
    const response = await apiInstance.post<User>('/a/auth/login', data);
    saveSession(response.data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await apiInstance.post('/a/auth/logout');
    clearSession();
  },

  sessionInfo: async (): Promise<User> => {
    const response = await apiInstance.get<User>('/a/auth/session-info');
    return response.data;
  },

  refreshToken: async (): Promise<User> => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiInstance.post<User>('/a/auth/refresh', { refreshToken });
    saveSession(response.data);
    return response.data;
  },
  
  register: async (data: {
    nm: string;
    eml: string;
    pswd: string;
  }): Promise<{ message: string }> => {
    const response = await apiInstance.post('/a/auth/register', data);
    return response.data;
  },

  // 데모 계정 조회
  demoAccount: async (): Promise<User> => {
    const response = await apiInstance.get<User>('/a/auth/demo-account');
    return response.data;
  }
}; 