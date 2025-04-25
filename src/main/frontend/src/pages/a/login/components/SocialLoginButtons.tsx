import React from 'react';

interface SocialLoginButtonsProps {
  onSocialLogin?: (provider: string) => void;
}

const SocialLoginButtons: React.FC<SocialLoginButtonsProps> = ({ onSocialLogin }) => {
  const socialProviders = [
    { name: 'Google', icon: 'M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C8.086 2 4.3 5.648 4.3 10.011c0 4.363 3.786 8.011 8.245 8.011 4.458 0 8.244-3.648 8.244-8.011 0-.553-.058-1.093-.167-1.613h-8.077z', color: '#4285F4' },
    { name: 'Facebook', icon: 'M9.95235 3.29509H12.0477V0H9.07139V0.026C5.57736 0.183727 4.4438 2.24509 4.36794 4.46655H4.35791V6.67H2V10.0772H4.35791V20H7.7658V10.0772H11.3894L11.9177 6.67H7.7658V4.80682C7.7658 3.91227 8.67462 3.29509 9.95235 3.29509Z', color: '#1877F2' },
    { name: 'Instagram', icon: 'M12 2.982c2.937 0 3.285.011 4.445.064 1.072.049 1.655.228 2.042.379.514.2.88.437 1.265.822.385.385.622.751.822 1.265.15.387.33.97.379 2.042.053 1.16.064 1.508.064 4.445 0 2.938-.011 3.285-.064 4.445-.049 1.072-.228 1.655-.379 2.042-.2.514-.437.88-.822 1.265-.385.385-.751.622-1.265.822-.387.15-.97.33-2.042.379-1.16.053-1.508.064-4.445.064-2.937 0-3.285-.011-4.445-.064-1.072-.049-1.655-.228-2.042-.379-.514-.2-.88-.437-1.265-.822-.385-.385-.622-.751-.822-1.265-.15-.387-.33-.97-.379-2.042-.053-1.16-.064-1.508-.064-4.445 0-2.937.011-3.285.064-4.445.049-1.072.228-1.655.379-2.042.2-.514.437-.88.822-1.265.385-.385.751-.622 1.265-.822.387-.15.97-.33 2.042-.379 1.16-.053 1.508-.064 4.445-.064', color: '#E4405F' },
    { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z', color: '#1DA1F2' },
    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', color: '#0A66C2' }
  ];

  const handleClick = (provider: string) => {
    if (onSocialLogin) {
      onSocialLogin(provider);
    }
  };

  return (
    <>
      <div className="relative mt-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-4 text-gray-500">다른 방법으로 로그인</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-3">
        {socialProviders.map((social) => (
          <button 
            key={social.name}
            onClick={() => handleClick(social.name)}
            className="flex justify-center items-center rounded-full border border-gray-300 bg-white p-2 hover:bg-gray-50 hover:shadow-sm transition-all duration-200 hover:scale-105"
            aria-label={`${social.name}로 로그인`}
          >
            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24" fill={social.color}>
              <path d={social.icon} />
            </svg>
          </button>
        ))}
      </div>
    </>
  );
};

export default SocialLoginButtons; 