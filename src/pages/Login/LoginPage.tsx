import React from 'react';
import { Link } from 'react-router-dom';

const LoginPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#e0f7f9]">
      <div className="text-center">
        <img src="/assets/service_logo.svg" alt="Service Logo" className="w-40 h-40 mx-auto mb-4" />
        <div className="bg-white rounded-lg shadow-lg p-8 w-100">
          <form>
            <input type="id" placeholder="아이디" className="border p-2 w-full mb-4" />
            <input type="password" placeholder="비밀번호" className="border p-2 w-full mb-4" />
            <button type="submit" className="bg-[#a0d4d8] w-full py-2 text-white rounded">
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
