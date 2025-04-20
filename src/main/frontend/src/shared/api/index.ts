// API 클라이언트 설정
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export const api = {
  get: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },
  
  post: async <T, D extends Record<string, unknown>>(endpoint: string, data: D): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },
  
  put: async <T, D extends Record<string, unknown>>(endpoint: string, data: D): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },
  
  delete: async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`API 요청 실패: ${response.status}`);
    }
    return response.json();
  },
}; 