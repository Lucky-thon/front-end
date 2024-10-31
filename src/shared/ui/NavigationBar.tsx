import { useNavigate, useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: '홈', path: '/' },
    { label: '인원 모집', path: '/find-partners' },
    { label: '미션 성공', path: '/success-album' },
    { label: '사용 설명서', path: '/user-guide' },
  ];

  return (
    <div className="flex justify-around items-center h-[100px] px-4 py-3 sm:px-8 sm:py-6 bg-custom_teal-300 w-full">
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
      <img
        src="/assets/hallow_bell.svg"
        alt="hallow_bell_image"
        onClick={() => navigate('/notification')}
        className={`cursor-pointer ${
          location.pathname === '/notification' ? 'text-red-500' : ''
        } hover:opacity-80 h-4 w-4 sm:h-5 sm:w-5 md:h-5 md:w-5`}
      />
      
      {/* 프로필 설정 이미지 추가 */}
      <img
        src="/assets/image.png" // 여기에 이미지 경로를 적어줘
        alt="user_avatar"
        onClick={() => navigate('/profile')} // ProfileSettingsPage.tsx로 넘어감
        className="cursor-pointer w-12 h-12 rounded-full mr-80"  // 크기와 둥근 테두리 설정, 오른쪽 여백 추가
      />
    </div>
  );
};

export default NavigationBar;
