import axios from 'axios';

// 세션 정보를 가져오는 API 함수
export const fetchSessionInfo = async () => {
  try {
    const response = await axios.get('/api/a/auth/session');
    return response.data;
  } catch (error) {
    console.error('세션 정보 가져오기 실패:', error);
    return null;
  }
};

// 로그인 상태 확인 API 함수
export const checkLoginStatus = async () => {
  try {
    const response = await axios.get('/api/a/auth/check');
    return response.data;
  } catch (error) {
    console.error('로그인 상태 확인 실패:', error);
    return { isLoggedIn: false };
  }
}; 