import { useQuery } from 'react-query';
import { getDailyMission } from 'shared/hooks/useDailyMission';
import { DailyMissionResponseProps } from 'shared/types/dailyMissionResponse.type';

const DailyMission = () => {
  /*const { data, error, isLoading } = useQuery<DailyMissionResponseProps, Error>(
    'missions',
    getDailyMission,
  );
  if (error) {
    console.log(error.message);
  }*/

  // 현재 날짜와 요일을 가져오는 함수
  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    }; // TypeScript를 위한 타입 정의
    const today = new Date();
    return today.toLocaleDateString('ko-KR', options); // 한국어로 포맷팅
  };

  const currentDate = getCurrentDate(); // 현재 날짜 가져오기

  return (
    <>
      <div className="flex justify-around items-center h-[70px] px-4 py-3 sm:px-8 sm:py-6 bg-custom_teal-400 w-full">
        <div className="flex gap-2">
          <img
            src="/assets/checkbox.svg"
            alt="checkbox"
            className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8"
          />
          <p>오늘의 미션에 대한 설명</p>
        </div>
        <p>{currentDate}</p>
      </div>
      <div className="flex justify-center m-4 sm:m-10">
        <div className="bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[800px] max-w-[800px] rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">오늘의 미션 제목</h2>
          <p className="text-sm sm:text-base text-gray-700">오늘의 미션에 대한 설명...</p>
        </div>
      </div>
    </>
  );
};

export default DailyMission;
