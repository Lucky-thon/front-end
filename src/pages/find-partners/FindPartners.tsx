import React, { useState } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import axios from 'axios';

interface Comment {
  username: string;
  content: string;
}

interface PartnerProps {
  id: number;
  title: string;
  content: string;
  author: string;
  comments: Comment[];
}

const FindPartners = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<PartnerProps | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [comment, setComment] = useState('');

  const itemsPerPage = 6;

  // 데이터 Fetching을 위한 useQuery 사용
  const {
    data: partners,
    isLoading,
    isError,
  } = useQuery('partners', async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_API_SERVER_URL}/board/api/recruitment/`,
    );
    return response.data;
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터를 불러오는 데 실패했어요...</div>;

  const totalPages = Math.ceil(partners.length / itemsPerPage);
  const paginatedPartners = partners.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

  const handlePostSubmit = () => {
    navigate('/create-partner-post');
  };

  const openModal = (post: PartnerProps) => {
    setSelectedPost(post);
    window.history.pushState(null, '', `/find-partners/${post.id}`);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setComment('');
    navigate('/find-partners');
  };

  const addComment = () => {
    if (selectedPost && comment.trim()) {
      if (!selectedPost.comments) {
        selectedPost.comments = [];
      }

      selectedPost.comments.push({ username: selectedPost.author, content: comment });

      setSelectedPost({ ...selectedPost });
      setComment('');
    }
  };

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
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[900px] min-w-[800px] max-w-[1000px] rounded-lg shadow-lg">
          <div className="flex justify-between">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">인원 모집</h2>
            <div
              className="bg-custom_teal-400 text-black font-semibold py-2 px-4 rounded-lg shadow hover:bg-white transition duration-200 cursor-pointer"
              onClick={handlePostSubmit}
            >
              작성하기
            </div>
          </div>
          <ul className="w-full">
            {paginatedPartners.map((partner: PartnerProps) => (
              <li
                key={partner.id}
                className="bg-white p-4 my-2 rounded-lg shadow-md hover:bg-background_elevated transition duration-200 cursor-pointer"
                onClick={() => openModal(partner)}
              >
                <h3 className="text-lg font-semibold">제목: {partner.title}</h3>
                <p>내용: {partner.content}</p>
                <p>작성자: {partner.author}</p>
              </li>
            ))}
          </ul>
          <div className="flex justify-center mt-4 gap-96">
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
        </div>
      </div>

      {/* Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-[800px] w-full">
            <div className="mb-2">
              <h3 className="text-xl font-bold mb-4">{selectedPost.title}</h3>
              <p className="mb-4">{selectedPost.content}</p>
            </div>
            {selectedPost.comments && selectedPost.comments.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold">댓글:</h4>
                {selectedPost.comments.map((comment, index) => (
                  <p key={index} className="border-b border-gray-300 mb-2 pb-2">
                    <strong>{comment.username}:</strong> {comment.content}
                  </p>
                ))}
              </div>
            )}
            <textarea
              className="w-full p-2 border rounded mb-4"
              placeholder="댓글을 입력하세요"
              rows={4}
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            ></textarea>
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-custom_teal-400 text-black rounded"
                onClick={closeModal}
              >
                닫기
              </button>
              <button
                onClick={addComment}
                className="px-4 py-2 bg-custom_teal-400 text-black rounded"
              >
                댓글 작성
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FindPartners;
