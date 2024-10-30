import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getDailyMission } from 'shared/hooks/useDailyMission';
import { DailyMissionProps } from 'shared/types/dailyMission.type';
import { DailyMissionResponseProps } from 'shared/types/dailyMissionResponse.type';

const DailyMission = () => {
  const { data, error, isLoading, refetch } = useQuery<DailyMissionResponseProps, Error>(
    'missions',
    getDailyMission,
  );
  const [missionList, setMissionList] = useState<DailyMissionProps[]>([]);

  if (error) {
    console.error(error.message);
  }

  const getCurrentDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    };
    const today = new Date();
    return today.toLocaleDateString('ko-KR', options);
  };

  const currentDate = getCurrentDate();

  useEffect(() => {
    if (data) {
      // 활성화된 미션 찾기
      const activeMission = data.find((mission) => mission.is_active === true);
      if (activeMission) {
        setMissionList([activeMission]); // 활성화된 미션만 설정
      } else {
        setMissionList([]); // 활성화된 미션이 없을 경우 빈 배열 설정
      }
      console.log(activeMission);
    }
  }, [data]);

  // 매분 데이터 업데이트
  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 60000); // 1분 = 60000ms

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, [refetch]);

  if (isLoading) return <p className="flex justify-center items-center">Loading...</p>;
  if (error)
    return <p className="flex justify-center items-center">오류가 발생했습니다: {error.message}</p>;

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
        <div className="bg-custom_teal-300 p-8 sm:p-10 h-auto w-auto min-h-[400px] max-h-[800px] min-w-[600px] max-w-[800px] rounded-lg shadow-lg flex flex-col justify-center items-center text-center">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4">
            {missionList.length > 0 ? missionList[0].title : '오늘의 미션이 없습니다.'}
          </h2>
          <p className="text-sm sm:text-base text-gray-700">
            {missionList.length > 0 ? missionList[0].description : '미션 설명이 없습니다.'}
          </p>
        </div>
      </div>
    </>
  );
};

export default DailyMission;
