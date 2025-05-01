import axios from 'axios';

const baseURL = 'http://localhost:8080/api'; // 백엔드 서버 URL

export const apiInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 중요: 세션 쿠키를 요청에 포함
});

// 요청 인터셉터 추가
apiInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 추가
apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 토큰이 만료되었거나 유효하지 않은 경우 로그인 페이지로 리다이렉트
      localStorage.removeItem('token');
      window.location.href = '/a/login';
    }
    return Promise.reject(error);
  }
);

export default apiInstance; 