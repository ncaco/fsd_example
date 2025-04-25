import React from 'react';

const LoginLeft: React.FC = () => {
  return (
    <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-red-300 to-red-600 p-12 flex-col justify-center relative">
      <div className="max-w-lg mx-auto">
        <div className="text-white">
          <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.1s'}}>Feature</h2>
          <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>Sliced</h2>
          <h2 className="text-5xl font-bold mb-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>Design</h2>
          <h2 className="text-5xl font-bold animate-fade-in-up" style={{animationDelay: '0.4s'}}>a Learning.</h2>
          
          <div className="mt-12 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
            <p className="text-white/90">You will never know everything.</p>
            <p className="text-white/90">But you will know more.</p>
          </div>
        </div>
      </div>

      {/* 배경 패턴 */}
      <div className="absolute inset-0 opacity-10">
        <div className="h-full w-full bg-[radial-gradient(circle,rgba(255,255,255,0.8)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
    </div>
  );
};

export default LoginLeft; 