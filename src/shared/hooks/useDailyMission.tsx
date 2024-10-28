import { defaultAxios } from 'shared/api/defaultAxios';
import { DailyMissionProps } from 'shared/types/dailyMission.type';

//  API 엔드포인트에서 데이터를 가져오는 비동기 함수
export const getDailyMission = async (): Promise<DailyMissionProps> => {
  const response = await defaultAxios.get<DailyMissionProps>(`/api/v1/...`); // ...에 url 작성
  return response.data;
};
