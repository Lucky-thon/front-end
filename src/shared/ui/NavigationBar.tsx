// NavigationBar.tsx
import React, { useContext } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { ProfileImageContext } from "context/ProfileImageContext"; // 경로가 올바른지 확인

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(ProfileImageContext); // Context 가져오기

  const profileImage = context?.profileImage || "/assets/image.png"; // 기본 이미지 설정

  const navItems = [
    { label: '홈', path: '/' },
    { label: '인원 모집', path: '/find-partners' },
    { label: '미션 성공', path: '/success-album' },
    { label: '사용 설명서', path: '/user-guide' },
  ];

  return (
    <div className="flex justify-center items-center h-[100px] px-4 py-3 sm:px-8 sm:py-6 bg-custom_teal-300 w-full">
      <div className="flex items-center gap-x-20">
        <img src="/assets/service_logo.svg" alt="our_logo" />
        {navItems.map((item, index) => (
          <span
            key={index}
            onClick={() => navigate(item.path)}
            className={`cursor-pointer ${
              location.pathname === item.path ? 'text-active_category font-bold' : 'text-black'
            } hover:text-pink-600 text-xs sm:text-sm md:text-base`}
          >
            {item.label}
          </span>
        ))}
      </div>

      <div className="flex items-center ml-auto">
        <img
          src="/assets/hallow_bell.svg"
          alt="hallow_bell_image"
          onClick={() => navigate('/notification')}
          className={`cursor-pointer ${
            location.pathname === '/notification' ? 'text-red-500' : ''
          } hover:opacity-80 h-5 w-5`}
          style={{ marginRight: '50px' }}
        />
        <img
          src={profileImage} // Context에서 가져온 프로필 이미지 또는 기본 이미지
          alt="user_avatar"
          onClick={() => navigate('/profile')} // ProfileSettingsPage.tsx로 넘어감
          className="cursor-pointer w-12 h-12 rounded-full"
          style={{ marginRight: '200px' }}
        />
      </div>
    </div>
  );
};

export default NavigationBar;
