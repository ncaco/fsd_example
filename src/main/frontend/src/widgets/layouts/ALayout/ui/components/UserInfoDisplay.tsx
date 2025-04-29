import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';

export const UserInfoDisplay: React.FC = () => {
    const { user, isAuthenticated, isLoading } = useSelector((state: RootState) => state.auth);

    console.log('user', user);
    console.log('isAuthenticated', isAuthenticated);
    console.log('isLoading', isLoading);

    return (
        <div className="px-6 py-5 border-b border-gray-200">
            <div className="text-sm text-gray-700">
                <h3 className="text-lg font-medium text-gray-900 mb-2">사용자 정보</h3>
                <div className="grid grid-cols-1 gap-2">
                    <div>
                        <span className="font-bold mr-2">세션 상태:</span>
                        {isLoading ? (
                            <span className="inline-flex items-center">
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                정보 로드 중...
                            </span>
                        ) : isAuthenticated ? (
                            <span className="text-green-600 font-medium">로그인됨</span>
                        ) : (
                            <span className="text-red-600 font-medium">로그인 필요</span>
                        )}
                    </div>

                    <div>
                        <span className="font-bold mr-2">이름:</span>
                        {isLoading ? (
                            <span className="text-gray-400">로드 중...</span>
                        ) : user?.nm ? (
                            <span className="text-gray-900">{user.nm}</span>
                        ) : (
                            <span className="text-gray-400">정보 없음</span>
                        )}
                    </div>

                    <div>
                        <span className="font-bold mr-2">이메일:</span>
                        {isLoading ? (
                            <span className="text-gray-400">로드 중...</span>
                        ) : user?.eml ? (
                            <span className="text-gray-900">{user.eml}</span>
                        ) : (
                            <span className="text-gray-400">정보 없음</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}; 