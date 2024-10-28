import axios, { AxiosInstance } from 'axios';

// API 요청의 기본 URL을 지정
interface DefaultConfigure {
  baseURL: string | undefined;
}

// .env 파일에 저장된 서버 URL
const defaultConfigure: DefaultConfigure = {
  baseURL: process.env.REACT_APP_API_SERVER_URL, // REACT_APP_API_SERVER_URL 이건 .env 파일에 저장해놓고 gitignore로 숨길 것
};

// 인증이 필요한 요청에서 쿠키를 자동으로 포함해 서버와 통신하도록 Axios 설정
axios.defaults.withCredentials = true;

// Axios 인스턴스 생성
const defaultAxios: AxiosInstance = axios.create(defaultConfigure);

// defaultAxios 내보내기
export { defaultAxios };
