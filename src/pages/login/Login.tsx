import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface LoginPageProps {
  setIsAuthenticated: (value: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setIsAuthenticated }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        console.error('모든 필드를 입력해주세요.');
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER_URL}/accounts/api/login/`,
        {
          username,
          password,
        },
      );
      //  로그인해서 response.data를 확인 -> 그 안에 내 아이디 그대로 들어있는 필드 있는지 확인 -> 그 필드 갈기기
      console.log('로그인 성공:', response.data);
      console.log('로그인 응답 데이터:', JSON.stringify(response.data, null, 2)); // 전체 응답을 JSON 형식으로 출력
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true); // 로그인 성공 시 인증 상태를 true로 설정
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('로그인 실패:', error.response.data);
      } else {
        console.error('로그인 실패:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e0f7f9]">
      <div className="text-center">
        <img src="/assets/service_logo.svg" alt="Service Logo" className="w-40 h-40 mx-auto mb-4" />
        <div className="bg-white rounded-lg shadow-lg p-8 w-100">
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="아이디"
              className="border p-2 w-full mb-4"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="비밀번호"
              className="border p-2 w-full mb-4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-custom_teal-300 text-black py-2 px-4 rounded w-full hover:bg-custom_teal-400 transition duration-200 cursor-pointer"
            >
              로그인
            </button>
          </form>
          <Link to="/signup" className="text-blue-500 text-sm mt-4 inline-block">
            또는 회원가입하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
