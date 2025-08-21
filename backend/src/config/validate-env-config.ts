import z from 'zod';
import { TEnvConfig, envSchema } from '../schema/env.schema';

export const validateEnvConfig = (
  config: Record<string, unknown>,
): TEnvConfig => {
  const parsed = envSchema.safeParse(config);
  if (!parsed.success) {
    console.error(
      'Error validating ENV:',
      z.treeifyError(parsed.error).properties,
    );
    process.exit(1);
  }
  return parsed.data;
};
