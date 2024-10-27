import { useNavigate, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "홈", path: "/" },
    { label: "인원 모집", path: "/find-partners" },
    { label: "미션 성공", path: "/success-album" },
    { label: "사용 설명서", path: "/user-guide" },
  ];

  return (
    <div className="flex justify-around items-center px-4 py-3 sm:px-8 sm:py-6 bg-custom_teal-400 w-full">
      {navItems.map((item, index) => (
        <span
          key={index}
          onClick={() => navigate(item.path)}
          className={`cursor-pointer ${
            location.pathname === item.path
              ? "text-black font-bold"
              : "text-white"
          } hover:text-pink-600 text-xs sm:text-sm md:text-base`}
        >
          {item.label}
        </span>
      ))}
      <img
        src="/assets/hallow_bell.svg"
        alt="hallow_bell_image"
        onClick={() => navigate("/notification")}
        className={`cursor-pointer ${
          location.pathname === "/notification" ? "text-red-500" : ""
        } hover:opacity-80 h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8`}
      />
    </div>
  );
};

export default NavigationBar;
