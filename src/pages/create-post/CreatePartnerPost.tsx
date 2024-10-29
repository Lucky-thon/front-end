import React, { useState } from 'react';
import { useMutation } from 'react-query';
import NavigationBar from 'shared/ui/NavigationBar';

const CreatePartnerPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  // POST 요청 처리 함수
  const postPartner = async (newPost: any) => {
    const response = await fetch('https://API주소/엔드포인트', {
      // 서버 URL이랑 endpoint 완성 시 여기다 갈기기
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });

    if (!response.ok) {
      throw new Error('게시글 업로드 실패');
    }

    const responseData = await response.json();
    console.log('응답 데이터:', responseData); // POST 요청 체크
    return responseData;
  };

  // useMutation 훅을 사용하여 POST 요청 설정
  const mutation = useMutation(postPartner, {
    onSuccess: () => {
      alert('게시글이 성공적으로 업로드됐어요!');
      setTitle('');
      setContent('');
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('업로드에 실패했어요...');
    },
  });

  const handlePostSubmit = () => {
    mutation.mutate({ title, content }); // POST 요청 실행
  };

  return (
    <div>
      <NavigationBar />
      <div className="max-w-2xl mx-auto mt-10 p-6 min-h-[600px] bg-custom_teal-300 border border-blue-300 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">글쓰기</h2>

        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            제목
          </label>
          <input
            type="text"
            id="title"
            className="w-full mt-1 p-2 border border-gray-300 rounded"
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="content" className="block text-black">
            글 내용
          </label>
          <textarea
            id="content"
            className="w-full mt-1 p-2 min-h-[300px] border border-gray-300 rounded"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="flex items-center justify-end">
          <button
            onClick={handlePostSubmit}
            className="px-4 py-2 bg-custom_teal-400 text-bold text-black rounded hover:bg-white transition duration-200 cursor-pointer"
            disabled={mutation.isLoading} // 로딩 중일 때 버튼 비활성화
          >
            {mutation.isLoading ? '업로드 중...' : '업로드하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePartnerPost;
