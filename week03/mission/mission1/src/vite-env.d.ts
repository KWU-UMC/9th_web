/// <reference types="vite/client" /> 

/// 타입추론 받을수록 더 안전, 환경변수 사용할 때 import.meta 객체의 타입을 타입스크립트에게 알려주기 위해 인터페이스 정의
/// 이렇게하면 타입 추론을 정확하게 해줌

interface ImportMetaEnv {
    readonly VITE_TMDB_KEY : string;
}

interface ImportMeta {
    readonly env : ImportMetaEnv;
}

