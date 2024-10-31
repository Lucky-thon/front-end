// ProfileImageContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

type ProfileImageContextType = {
  profileImage: string | null;
  setProfileImage: (image: string | null) => void;
};

const ProfileImageContext = createContext<ProfileImageContextType | undefined>(undefined);

const ProfileImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profileImage, setProfileImage] = useState<string | null>(null);

  return (
    <ProfileImageContext.Provider value={{ profileImage, setProfileImage }}>
      {children}
    </ProfileImageContext.Provider>
  );
};

export { ProfileImageContext, ProfileImageProvider };
