import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavigationBar from 'shared/ui/NavigationBar';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { hasPostedInMissionSuccessState } from '../../recoil/missionState';

interface SuccessPostProps {
  id: number;
  title: string;
  author: string;
  image: string;
  created_at: string;
}

const SuccessAlbum = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<SuccessPostProps | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const hasPostedInMissionSuccess = useRecoilValue(hasPostedInMissionSuccessState);
  const setHasPostedInMissionSuccess = useSetRecoilState(hasPostedInMissionSuccessState);
  const itemsPerPage = 9;

  const [successPosts, setSuccessPosts] = useState<SuccessPostProps[]>([]);

  const fetchSuccessPosts = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('로그인 토큰이 없습니다.');
      }

      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/board/api/mission-success/`,
        { headers: { Authorization: `Token ${token}` } },
      );

      setHasPostedInMissionSuccess(response.data.has_posted_in_mission_success || false);
      setSuccessPosts(response.data.successPosts || []);
    } catch (error) {
      console.error(error);
      setHasPostedInMissionSuccess(false);
    }
  };

  useEffect(() => {
    fetchSuccessPosts();
  }, []);

  const totalPages = Math.ceil(successPosts.length / itemsPerPage);
  const paginatedPosts = successPosts.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const handlePostSubmit = () => navigate('/create-success-post');

  const openModal = (post: SuccessPostProps) => setSelectedPost(post);

  const closeModal = () => setSelectedPost(null);

  const goToPreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center m-4 sm:m-10">
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto min-h-screen w-auto max-h-[2000px] min-w-[800px] max-w-[1000px] rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">미션 성공</h2>
            <div
              className="bg-custom_teal-400 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-white transition duration-200 cursor-pointer"
              onClick={handlePostSubmit}
            >
              작성하기
            </div>
          </div>
          {hasPostedInMissionSuccess ? (
            <>
              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {paginatedPosts.map((post: SuccessPostProps) => (
                  <li
                    key={post.id}
                    className="bg-white p-4 rounded-lg shadow-md hover:bg-background_elevated transition duration-200 cursor-pointer"
                    onClick={() => openModal(post)}
                  >
                    <img
                      src={post.image}
                      alt="미션 성공 이미지"
                      className="mb-2 w-full h-48 object-cover rounded-md"
                    />
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <p>작성자: {post.author}</p>
                    <p>작성 일자: {new Date(post.created_at).toLocaleDateString()}</p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center mt-4">
                {currentPage > 0 && (
                  <button
                    onClick={goToPreviousPage}
                    className="px-4 py-2 bg-custom_teal-400 text-black rounded shadow hover:bg-white transition duration-200 cursor-pointer"
                  >
                    이전
                  </button>
                )}
                {currentPage < totalPages - 1 && (
                  <button
                    onClick={goToNextPage}
                    className="px-4 py-2 bg-custom_teal-400 text-black rounded shadow hover:bg-white transition duration-200 cursor-pointer"
                  >
                    다음
                  </button>
                )}
              </div>
            </>
          ) : (
            <div>미션 성공 게시글을 먼저 업로드해야 게시판을 볼 수 있습니다.</div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[400px] max-w-[1000px]">
            <div className="mb-2">
              <img
                src={selectedPost.image}
                alt="미션 성공 이미지"
                className="w-full min-h-[400px] max-h-[600px] object-contain rounded-md"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-custom_teal-400 text-black rounded"
                onClick={closeModal}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuccessAlbum;
