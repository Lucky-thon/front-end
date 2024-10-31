import React, { useState, useContext } from 'react'; // useContext 추가
import NavigationBar from 'shared/ui/NavigationBar';
import { ProfileImageContext } from "context/ProfileImageContext"; // 경로가 올바른지 확인

const ProfileSettingsPage = () => {
  const [nickname, setNickname] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const { profileImage, setProfileImage } = useContext(ProfileImageContext)!; // Context가 undefined일 가능성을 처리

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // 선택한 이미지를 profileImage에 저장
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitted:', { nickname, bio, profileImage });
  };

  return (
    <div style={{ backgroundColor: '#e0f7fa', minHeight: '100vh' }}>
      <NavigationBar />
      <div 
        style={{
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: 'calc(100vh - 70px)', // 화면 높이에 맞추기
          padding: '20px',
        }}
      >
        <div 
          style={{
            background: '#A6E3E9',
            borderRadius: '8px',
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
            boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h1 style={{ textAlign: 'center', fontSize: '1.5em', marginBottom: '20px' }}>프로필 설정</h1>
          {/* 프로필 이미지 추가 */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <img 
              src={profileImage || '/assets/image.png'}
              alt="Profile"
              style={{ width: '150px', height: '150px', borderRadius: '50%' }} 
            />
          </div>
          <form onSubmit={handleSubmit}>
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
            </div>
            <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '4px', backgroundColor: '#00796b', color: 'white', border: 'none', cursor: 'pointer' }}>
              저장
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettingsPage;
