/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Ajv from 'ajv';
export const ajv = new Ajv({
  allErrors: true,
  strict: false,
});
