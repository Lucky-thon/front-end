import { useQuery } from 'react-query';
import { getDailyMission } from 'shared/hooks/useDailyMission';
import { DailyMissionResponseProps } from 'shared/types/dailyMissionResponse.type';

const UserGuideScreen = () => {
  return (
    <>
      <div className="flex justify-center m-4 sm:m-10">
        <div className="bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[800px] max-w-[800px] rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">모두의 앨범 사용설명서</h2>
          <p className="text-sm sm:text-base text-gray-700 mb-4">
            아래 설명서를 따라 사용해 보세요.
          </p>
          <ul className="list-disc list-inside text-left text-gray-700 text-sm sm:text-base">
            <li>앱에 로그인하여 메인 화면에 접근하세요.</li>
            <li>앨범 추가 버튼을 눌러 새 앨범을 만들 수 있습니다.</li>
            <li>앨범 안에 사진이나 동영상을 업로드하여 공유할 수 있습니다.</li>
            <li>친구들을 초대하고, 앨범을 함께 관리할 수 있습니다.</li>
            <li>모든 변화는 실시간으로 저장됩니다.</li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default UserGuideScreen;
