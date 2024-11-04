import { atom } from 'recoil';

export const hasPostedInMissionSuccessState = atom({
  key: 'hasPostedInMissionSuccessState', // 각 atom은 고유한 key 필요
  default: false,
});
