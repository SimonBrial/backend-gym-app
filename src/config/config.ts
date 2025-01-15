import 'dotenv/config'

interface Env {
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_TYPE: string;
  DB_NAME: string;
  PORT: number;
}

const getEnvVariable = (key: keyof Env): string | undefined => {
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Environment variable ${key} is not set.`);
  }
  return value as string;
};

const config: Env = {
  DB_PORT: parseInt(getEnvVariable("DB_PORT")!, 10),
  PORT: parseInt(getEnvVariable("PORT")!, 10) || 3000,
  DB_PASSWORD: getEnvVariable("DB_PASSWORD")!,
  DB_HOST: getEnvVariable("DB_HOST")!,
  DB_NAME: getEnvVariable("DB_NAME")!,
  DB_USER: getEnvVariable("DB_USER")!,
  DB_TYPE: getEnvVariable("DB_TYPE")!,
};

export default config;
