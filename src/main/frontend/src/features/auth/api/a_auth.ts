import apiInstance from '@/shared/api';
import { User } from '@/types/a/user';

export interface LoginRequest {
  eml: string;
  pswd: string;
}

export const authApi = {
  a_login: async (data: LoginRequest): Promise<User> => {
    const response = await apiInstance.post<User>('/a/auth/login', data);
    console.log(response);
    return response.data;
  },

  a_logout: async (): Promise<void> => {
    await apiInstance.post('/a/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  a_refreshToken: async (): Promise<User> => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiInstance.post<User>('/a/auth/refresh', { refreshToken });
    return response.data;
  },
  
  a_register: async (data: {
    nm: string;
    eml: string;
    pswd: string;
  }): Promise<{ message: string }> => {
    const response = await apiInstance.post('/a/auth/register', data);
    return response.data;
  },

  // 데모 계정 조회
  a_demoAccount: async (): Promise<User> => {
    const response = await apiInstance.get<User>('/a/auth/demo-account');
    return response.data;
  }
}; 