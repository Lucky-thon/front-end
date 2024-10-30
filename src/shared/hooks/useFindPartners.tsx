import { defaultAxios } from 'shared/api/defaultAxios';
import { DailyMissionResponseProps } from 'shared/types/dailyMissionResponse.type';

//  API 엔드포인트에서 데이터를 가져오는 비동기 함수
export const getDailyMission = async (): Promise<DailyMissionResponseProps> => {
  const response = await defaultAxios.get<DailyMissionResponseProps>(`/api/mission/`); // ...에 url 작성
  return response.data;
};
