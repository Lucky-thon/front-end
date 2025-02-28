import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationBar from 'shared/ui/NavigationBar';
import axios from 'axios';

interface Comment {
  id: number;
  comment: string;
  post: number;
  writer: string;
  create_at: string;
}

const CommentPage: React.FC = () => {
  const location = useLocation();
  const { title, author, content, id } = location.state || {};
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const fetchComments = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/board/api/recruitment/comments/${id}`,
        {
          headers: {
            Authorization: `Token ${localStorage.getItem('token')}`,
          },
        },
      );
      console.log('댓글 가져오기 성공:', response.data);

      setComments(response.data);
    } catch (error) {
      console.error('댓글 가져오기 실패:', error);
      if (axios.isAxiosError(error) && error.response) {
        console.error('서버 응답 오류:', error.response.data);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchComments(); // 페이지 로드 시 댓글을 가져오는 GET 요청
  }, [fetchComments]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_SERVER_URL}/board/api/recruitment/comments/create/${id}`,
          {
            comment: newComment,
            post: id,
            writer: location.state.writer,
          },
          {
            headers: {
              Authorization: `Token ${localStorage.getItem('token')}`,
            },
          },
        );

        console.log('댓글 추가 성공:', response.data);
        setComments((prevComments) => [...prevComments, response.data]);
        setNewComment('');
        fetchComments(); // 댓글 추가 후 다시 가져오기
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          console.error('댓글 추가 실패:', error.response.data);
        } else {
          console.error('댓글 추가 실패:', error);
        }
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="flex justify-center m-4 sm:m-10">
        <div className="flex flex-col gap-3 bg-custom_teal-300 p-8 sm:p-10 h-auto w-full max-w-[800px] rounded-lg shadow-lg">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold">{title}</h2>
            <p className="mt-2">{content}</p>
            <p className="mt-4 text-gray-600">작성자: {author}</p>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold">댓글</h3>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="bg-white p-2 my-2 rounded-lg shadow-md border">
                  <strong>{comment.writer}</strong>: {comment.comment}
                </div>
              ))
            ) : (
              <p>아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!</p>
            )}
          </div>
          <textarea
            className="w-full p-2 border rounded mb-4"
            placeholder="댓글을 입력하세요"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            className="px-4 py-2 bg-custom_teal-400 text-black rounded shadow hover:bg-white transition duration-200"
            onClick={handleAddComment}
          >
            댓글 작성
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentPage;
