import React, { useEffect, useState } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';
import UserGuideScreen from 'shared/ui/UserGuideScreen';

const UserGuide: React.FC = () => {
  return (
    <div className="mint-background">
      <NavigationBar />
      <UserGuideScreen />
    </div>
  );
};

export default UserGuide;
