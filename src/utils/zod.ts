import { type z, ZodError } from 'zod';

const parseSchema = (schema: z.Schema, data: unknown) => {
  try {
    schema.parse(data);
  } catch (err: unknown) {
    if (err instanceof ZodError) {
      const errors = err.errors.map(err => err.message);
      return errors.reduce((a, b) => `${a}. ${b}.`);
    }
    return 'Unknown error.';
  }
};

export default parseSchema;
