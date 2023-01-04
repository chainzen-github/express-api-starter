import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const ParamsWithId = z.object({
  id: z.string().min(1).refine((val) => {
    try {
      return new ObjectId(val);
    } catch (error) {
      return false;
    }
  }, {
    message: 'Invalid ObjectId',
  }),
});

export const ParamsWithUsername = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;
export type ParamsWithUsername = z.infer<typeof ParamsWithUsername>;
