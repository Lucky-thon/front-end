import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!username || !password) {
        console.error('모든 필드를 입력해주세요.');
        return;
      }
      const response = await axios.post(
        `${process.env.REACT_APP_API_SERVER_URL}/accounts/api/register/`,
        {
          username,
          password,
        },
      );

      console.log('회원가입 성공:', response.data);
      navigate('/'); // 회원가입 성공 후 Home 페이지로 이동
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error('회원가입 실패:', error.response.data);
      } else {
        console.error('회원가입 실패:', error);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-[#e0f7f9]">
      <div className="text-center">
        <img src="/assets/service_logo.svg" alt="Service Logo" className="w-40 h-40 mx-auto" />
        <div className="bg-white rounded-lg shadow-lg p-8 w-100">
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              placeholder="새 아이디"
              className="border p-2 mb-3 w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="새 비밀번호"
              className="border p-2 mb-3 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="submit"
              className="bg-custom_teal-300 text-black py-2 px-4 rounded w-full hover:bg-custom_teal-400 transition duration-200 cursor-pointer"
            >
              회원가입
            </button>
          </form>
          <a href="/login" className="text-[#007acc] mt-4 inline-block">
            이미 가입하셨나요?
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
