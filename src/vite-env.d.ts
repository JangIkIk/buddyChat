/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />


// 전역 타입설정
import { Socket } from "socket.io-client";
declare global {
  type GlobalSocket = Socket | null;
}

/*
환경변수에 대한 타입설정으로 자동완성 기능을 제공하지만 적용되고 있지않음
적용되지않는 문제 확인필요
*/
interface ImportMetaEnv {
  readonly VITE_TEST_WOCKET_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
