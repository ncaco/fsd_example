import apiInstance from '@/shared/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    email: string;
    roles: string[];
  };
}

export const authApi = {
  a_login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiInstance.post<LoginResponse>('/a/auth/login', data);
    return response.data;
  },

  a_logout: async (): Promise<void> => {
    await apiInstance.post('/a/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
  },

  a_refreshToken: async (): Promise<LoginResponse> => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await apiInstance.post<LoginResponse>('/a/auth/refresh', { refreshToken });
    return response.data;
  },
  
  a_register: async (data: {
    username: string;
    email: string;
    password: string;
  }): Promise<{ message: string }> => {
    const response = await apiInstance.post('/a/auth/register', data);
    return response.data;
  }
}; 