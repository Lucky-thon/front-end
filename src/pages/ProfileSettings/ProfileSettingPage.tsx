// ProfileSettingsPage.tsx
import React, { useState } from 'react';

const ProfileSettingsPage = () => {
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // 타입 단언 추가
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기에 서버로 데이터 전송 로직을 추가할 수 있어
    console.log('Submitted:', { nickname, bio, profileImage });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      padding: '20px', 
      backgroundColor: '#e0f7fa' 
    }}>
      <h1>프로필 설정</h1>
      {/* 프로필 이미지 추가 */}
      <img 
        src="/assets/image.png" // public/assets 경로에서 이미지 불러오기
        alt="Profile" 
        style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }} // 크기 변경
      />
      <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label>
            닉네임:
            <input 
              type="text" 
              value={nickname} 
              onChange={(e) => setNickname(e.target.value)} 
              required 
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            한줄 소개:
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              rows={4} 
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} 
            />
          </label>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label>
            프로필 이미지:
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ marginTop: '10px' }} 
            />
          </label>
          {profileImage && (
            <img 
              src={profileImage} 
              alt="Profile Preview" 
              style={{ width: '100%', marginTop: '10px', borderRadius: '8px' }} 
            />
          )}
        </div>
        <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#00796b', color: 'white', border: 'none', cursor: 'pointer' }}>
          저장
        </button>
      </form>
    </div>
  );
};

export default ProfileSettingsPage;
