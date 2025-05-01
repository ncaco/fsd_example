import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authApi, LoginRequest } from './api/a_auth';
import { User } from '@/entities/a/user';
import { AxiosError } from 'axios';

// 초기 상태 타입 정의
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// 로컬 스토리지에서 사용자 정보 가져오기
const getUserFromStorage = (): User | null => {
  try {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    // 토큰과 유저 정보가 모두 있어야 유효한 것으로 간주
    if (user && token) {
      return JSON.parse(user);
    }
    return null;
  } catch (e) {
    console.error('Failed to parse user from localStorage', e);
    return null;
  }
};

// 초기 상태
const initialState: AuthState = {
  user: getUserFromStorage(),
  isAuthenticated: !!getUserFromStorage(),
  isLoading: false,
  error: null,
};

// 로그인 비동기 액션 생성
export const login = createAsyncThunk<User, LoginRequest, { rejectValue: string }>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.a_login(credentials);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || '로그인에 실패했습니다.');
    }
  }
);

// 로그아웃 비동기 액션 생성
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authApi.a_logout();
      // 명시적으로 로컬 스토리지 정리
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      return;
    } catch (error) {
      // 에러가 발생해도 로컬 스토리지 정리
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || '로그아웃에 실패했습니다.');
    }
  }
);

// 세션 정보 가져오기 비동기 액션 생성
export const getSessionInfo = createAsyncThunk<User>(
  'auth/getSessionInfo',
  async (_, { rejectWithValue }) => {
    try {
      // 토큰이 없으면 API 호출 자체를 하지 않음
      const token = localStorage.getItem('token');
      if (!token) {
        return rejectWithValue('인증 정보가 없습니다.');
      }
      
      const response = await authApi.a_sessionInfo();
      return response;
    } catch (error) {
      // 세션 정보 가져오기 실패 시 로컬 스토리지 초기화
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      
      const axiosError = error as AxiosError<{ message: string }>;
      return rejectWithValue(axiosError.response?.data?.message || '세션 정보를 가져오는데 실패했습니다.');
    }
  }
);

// 인증 슬라이스 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    // 강제 로그아웃 액션 추가
    forceLogout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      // 로컬 스토리지 정리
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },
  extraReducers: (builder) => {
    builder
      // 로그인
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // 로그아웃
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      })
      // 세션 정보 가져오기
      .addCase(getSessionInfo.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSessionInfo.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(getSessionInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload as string;
      });
  },
});

export const { resetError, forceLogout } = authSlice.actions;
export default authSlice.reducer;