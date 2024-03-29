declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    JWT_SECRET: string;
    DATABASE_URL: string;
    NODE_DEV: string;
    BASE_URL: string;
    MINIO_ACCESS_KEY: string;
    MINIO_SECRET_KEY: string;
  }
}
