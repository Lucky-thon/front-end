import React, { useEffect, useState } from 'react';
import DailyMission from 'shared/ui/DailyMission';
import NavigationBar from 'shared/ui/NavigationBar';

const LogoSplash: React.FC<{ fadingOut: boolean }> = ({ fadingOut }) => (
  <div
    className={`fixed inset-0 flex items-center justify-center bg-white transition-opacity duration-1000 ${
      fadingOut ? 'opacity-0' : 'opacity-100'
    }`}
  >
    <img src="/assets/service_logo.svg" alt="Service Logo" className="w-32 h-32" />
  </div>
);

const Home: React.FC = () => {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return !localStorage.getItem('splashShown');
  });
  const [fadingOut, setFadingOut] = useState(false);

  useEffect(() => {
    if (showSplash) {
      const fadeInTimer = setTimeout(() => {
        setFadingOut(true);
      }, 1000);

      const hideSplashTimer = setTimeout(() => {
        setShowSplash(false);
        localStorage.setItem('splashShown', 'true');
      }, 2000);

      return () => {
        clearTimeout(fadeInTimer);
        clearTimeout(hideSplashTimer);
      };
    }
  }, [showSplash]);

  return (
    <div>
      {showSplash ? (
        <LogoSplash fadingOut={fadingOut} />
      ) : (
        <div className="transition-opacity duration-1000 opacity-100">
          <NavigationBar />
          <DailyMission />
        </div>
      )}
    </div>
  );
};

export default Home;
