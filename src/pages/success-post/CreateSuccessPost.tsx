import React, { useState } from 'react';
import { useMutation } from 'react-query';
import NavigationBar from 'shared/ui/NavigationBar';

const CreateSuccessPost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 이미지 선택 핸들러 함수
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const postSuccess = async (newPost: any) => {
    const response = await fetch('https://API주소/엔드포인트', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPost),
    });
    if (!response.ok) {
      throw new Error('게시글 업로드 실패');
    }
    return await response.json();
  };

  const mutation = useMutation(postSuccess, {
    onSuccess: () => {
      alert('게시글이 성공적으로 업로드됐어요!');
      setTitle('');
      setContent('');
      setSelectedImage(null);
    },
    onError: (error) => {
      console.error('Error:', error);
      alert('업로드에 실패했어요...');
    },
  });

  const handlePostSubmit = () => {
    mutation.mutate({ title, content });
  };

  return (
    <div>
      <NavigationBar />
      <div className="SuccessPost_container mx-auto mt-10 p-6 min-h-screen bg-custom_teal-300 border border-blue-300 rounded-lg shadow-lg relative">
        <h1 className="SuccessPost_title text-lg font-semibold mb-4">미션 성공 글쓰기</h1>

        {/* 파일 선택하기 버튼을 민트색 화면의 오른쪽 위에 위치 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="absolute top-6 right-6 bg-white px-3 py-1 text-sm border border-gray-300 rounded shadow cursor-pointer"
        />

        <div className="relative mb-4">
          {selectedImage && (
            <img src={selectedImage} alt="미리보기" className="w-48 h-48 object-cover mx-auto rounded mb-4" />
          )}
        </div>

        <div className="SuccessPost_content mb-3">
          <label htmlFor="content" className="block text-black mb-1">
            글 내용
          </label>
          <textarea
            id="content"
            className="SuccessPost_textarea w-full mt-2 p-2 min-h-[200px] border border-gray-300 rounded"
            placeholder="내용을 입력하세요"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>

        <div className="SuccessPost_buttonContainer flex items-center justify-end">
          <button
            onClick={handlePostSubmit}
            className="SuccessPost_submitButton px-4 py-2 bg-custom_teal-400 text-bold text-black rounded hover:bg-white transition duration-200 cursor-pointer"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? '업로드 중...' : '업로드하기'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateSuccessPost;
