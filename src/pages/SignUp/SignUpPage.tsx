import React from 'react';

const SignUpPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-[#e0f7f9]">
      <div className="text-center">
      <img src="/assets/service_logo.svg" alt="Service Logo" className="w-40 h-40 mx-auto" />

        <div className="bg-white rounded-lg shadow-lg p-8 w-100">
          <form>
            <input type="id" placeholder="새 아이디" className="border p-2 mb-3 w-full" />
            <input type="password" placeholder="새 비밀번호" className="border p-2 mb-3 w-full" />
            <button type="submit" className="bg-[#8ed0d4] text-white py-2 px-4 rounded w-full">
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
