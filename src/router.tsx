import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import FindPartners from './pages/find-partners/FindPartners';
import SuccessAlbum from './pages/success-album/SuccessAlbum';
import Notification from './pages/notification/Notification';
import UserGuide from './pages/user-guide/UserGuide';
import CreatePartnerPost from 'pages/create-post/CreatePartnerPost';
import CreateSuccessPost from 'pages/success-post/CreateSuccessPost';
import LoginPage from './pages/Login/LoginPage';
import SignUpPage from './pages/SignUp/SignUpPage';

const RouterComponent = () => {
  return (
    <Router>
      <Routes>
        <Route path="/success-album" element={<SuccessAlbum />} />
        <Route path="/find-partners" element={<FindPartners />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/user-guide" element={<UserGuide />} />
        <Route path="/create-partner-post" element={<CreatePartnerPost />} />
        <Route path="/create-success-post" element={<CreateSuccessPost />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </Router>
  );
};

export default RouterComponent;
