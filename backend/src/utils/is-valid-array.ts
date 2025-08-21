export const isValidArray = (v: unknown): v is unknown[] =>
  Array.isArray(v) && v.length > 0;
