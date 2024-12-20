declare namespace NodeJS {
    interface ProcessEnv {
      MONGO_URL:string;
      JWT_USER_PASSWORD: string;
      PORT: number;
    }
  }
