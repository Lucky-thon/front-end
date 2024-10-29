import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from 'shared/ui/NavigationBar';

const SuccessAlbum = () => {
  const navigate = useNavigate();
  const handlePostSubmit = () => {
    navigate('/create-success-post');
  };
  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center m-4 sm:m-10">
        <div className="flex flex-col bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[800px] min-w-[600px] max-w-[800px] rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">👍 미션 성공</h2>
            <div
              className="bg-custom_teal-400 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-white transition duration-200 cursor-pointer"
              onClick={handlePostSubmit}
            >
              작성하기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlbum;
