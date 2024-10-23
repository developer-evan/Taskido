export interface AppConfig {
    apiUrl: string;
    // appUrl:string;
    // appName:string
  }

const config: AppConfig = {
  apiUrl: "http://192.168.100.114:8000/api",
//   appUrl: process.env.REACT_APP_APP_URL as string,
//   appName: process.env.REACT_APP_APP_NAME as string,
};

export default config;