import React, { useState } from 'react';
import NavigationBar from 'shared/ui/NavigationBar';
import { useNavigate } from 'react-router-dom';

interface Comment {
  username: string; // 댓글 작성자의 이름 필드 추가
  content: string;
}

interface PartnerProps {
  title: string;
  content: string;
  username: string;
  comments: Comment[];
}

// 데이터 예시
const partner_sample = [
  { title: '1번', content: '안녕하세요, 박병욱입니다!!! 같이 미션해요~~', username: 'park' },
  { title: '2번', content: '안녕하세요, 이재현입니다!!! 같이 미션해요~~', username: 'lee' },
  { title: '3번', content: '안녕하세요, 이성민입니다!!! 같이 미션해요~~', username: 'lee sung' },
  { title: '4번', content: '안녕하세요, 김경재입니다!!! 같이 미션해요~~', username: 'kim' },
  { title: '5번', content: '안녕하세요, 이정진입니다!!! 같이 미션해요~~', username: 'lee jung' },
  { title: '6번', content: '안녕하세요, 전민경입니다!!! 같이 미션해요~~', username: 'jeon' },
  { title: '7번', content: '안녕하세요, 임재영입니다!!! 같이 미션해요~~', username: 'lim' },
  { title: '8번', content: '안녕하세요, 배경석입니다!!! 같이 미션해요~~', username: 'bae' },
];

const FindPartners = () => {
  const navigate = useNavigate();
  const [selectedPost, setSelectedPost] = useState<PartnerProps | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [comment, setComment] = useState(''); // 댓글 입력 상태
  const itemsPerPage = 6;
  const totalPages = Math.ceil(partner_sample.length / itemsPerPage);

  const handlePostSubmit = () => {
    navigate('/create-partner-post');
  };

  const openModal = (post: any) => {
    setSelectedPost(post);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setComment(''); // 모달을 닫을 때 댓글 입력 초기화
  };

  const addComment = () => {
    if (selectedPost && comment.trim()) {
      // 댓글 배열이 존재하지 않으면 초기화
      if (!selectedPost.comments) {
        selectedPost.comments = [];
      }

      // 댓글 추가
      selectedPost.comments.push({ username: selectedPost.username, content: comment });

      // 상태 업데이트
      setSelectedPost({ ...selectedPost }); // 상태 업데이트로 리렌더링 강제
      setComment(''); // 댓글 추가 후 입력 초기화
    }
  };

  const paginatedPartners = partner_sample.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage,
  );

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
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[900px] min-w-[600px] max-w-[800px] rounded-lg shadow-lg">
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
            {paginatedPartners.map((partner, index) => (
              <li
                key={index}
                className="bg-white p-4 my-2 rounded-lg shadow-md hover:bg-background_elevated transition duration-200 cursor-pointer"
                onClick={() => openModal(partner)}
              >
                <h3 className="text-lg font-semibold">Title: {partner.title}</h3>
                <p>Content: {partner.content}</p>
                <p>Username: {partner.username}</p>
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
              onChange={(e) => setComment(e.target.value)} // 댓글 상태 업데이트
              value={comment} // 댓글 상태로 입력 필드 설정
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
