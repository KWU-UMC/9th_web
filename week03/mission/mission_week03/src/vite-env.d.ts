/// <reference types="vite/client" />
interface ImportMetaEnv{
    readonly VITE_TMBD_KEY: string;
}

interface ImportMeta{
    readonly env: ImportMetaEnv;
}