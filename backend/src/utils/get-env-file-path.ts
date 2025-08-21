export const getEnvFilePath = (): string => {
  return process.env.NODE_ENV === 'production'
    ? '.env'
    : `.env.${process.env.NODE_ENV || 'development'}`;
};
