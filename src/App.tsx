import React from "react";
import RouterComponent from "./router";
import { ProfileImageProvider } from "context/ProfileImageContext"; // ProfileImageProvider 임포트

function App() {
  return (
    <ProfileImageProvider>
      <RouterComponent />
    </ProfileImageProvider>
  );
}

export default App;
