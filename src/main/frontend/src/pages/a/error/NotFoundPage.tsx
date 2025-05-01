import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <div className="text-center max-w-lg">
                <h1 className="text-9xl font-bold text-gray-200 mb-4">404</h1>
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">페이지를 찾을 수 없습니다</h2>
                    <p className="text-gray-600">요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.</p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <button 
                        onClick={() => navigate('/a')}
                        className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-md hover:from-red-700 hover:to-red-800 transition-colors shadow-md"
                    >
                        관리자 메인으로
                    </button>
                    <button 
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors shadow-md"
                    >
                        이전 페이지로
                    </button>
                </div>
            </div>
            <div className="mt-16 text-sm text-gray-500">
                문제가 지속되면 관리자에게 문의하세요.
            </div>
        </div>
    );
};

export default NotFoundPage;
