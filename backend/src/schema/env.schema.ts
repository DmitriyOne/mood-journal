import { z } from 'zod';
import { ENodeEnv } from '../enums';
import { NODE_ENV_ZOD_CONSTRAINTS } from '../constant';

export const envSchema = z.object({
  NODE_ENV: z.enum(ENodeEnv),
  DATABASE_URL: z.string().transform(String),
  PG_USER: z.string().transform(String),
  PG_HOST: z.string().transform(String),
  PG_DATABASE: z.string().transform(String),
  PG_PASSWORD: z.string().transform(String),
  PG_PORT: z.string().regex(NODE_ENV_ZOD_CONSTRAINTS.DIGITS).transform(Number),
  PORT: z.string().regex(NODE_ENV_ZOD_CONSTRAINTS.DIGITS).transform(Number),
  // JWT_SECRET: z
  //   .string()
  //   .min(
  //     NODE_ENV_JWT_SECRET_MIN_LENGTH,
  //   ),
  // SALT_ROUNDS: z
  //   .string()
  //   .regex(NODE_ENV_ZOD_CONSTRAINTS.DIGITS)
  //   .transform(Number),
  // THROTTLE_TTL: z
  //   .string()
  //   .regex(NODE_ENV_ZOD_CONSTRAINTS.DIGITS)
  //   .transform(Number),
  // THROTTLE_LIMIT: z
  //   .string()
  //   .regex(NODE_ENV_ZOD_CONSTRAINTS.DIGITS)
  //   .transform(Number),
});

export type TEnvConfig = z.infer<typeof envSchema>;
