import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import FindPartners from './pages/find-partners/FindPartners';
import SuccessAlbum from './pages/success-album/SuccessAlbum';
import Notification from './pages/notification/Notification';
import UserGuide from './pages/user-guide/UserGuide';
import CreatePartnerPost from 'pages/create-post/CreatePartnerPost';
import CreateSuccessPost from 'pages/success-post/CreateSuccessPost';
import SignUpPage from 'pages/SignUp/SignUpPage';
import LoginPage from 'pages/login/Login';
import ProtectedRoute from 'routes/ProtectedRoute';

const RouterComponent = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, [localStorage.getItem('token')]); // 토큰이 변경될 때마다 인증 상태 업데이트

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route
          path="/"
          element={<ProtectedRoute element={<Home />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/find-partners"
          element={<ProtectedRoute element={<FindPartners />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/success-album"
          element={<ProtectedRoute element={<SuccessAlbum />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/notification"
          element={<ProtectedRoute element={<Notification />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/user-guide"
          element={<ProtectedRoute element={<UserGuide />} isAuthenticated={isAuthenticated} />}
        />
        <Route
          path="/create-partner-post"
          element={
            <ProtectedRoute element={<CreatePartnerPost />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route
          path="/create-success-post"
          element={
            <ProtectedRoute element={<CreateSuccessPost />} isAuthenticated={isAuthenticated} />
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
