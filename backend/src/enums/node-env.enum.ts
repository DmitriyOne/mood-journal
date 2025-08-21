export const ENodeEnv = {
  development: 'development',
  production: 'production',
  test: 'test',
} as const;

export type ENodeEnv = (typeof ENodeEnv)[keyof typeof ENodeEnv];
