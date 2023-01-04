
import * as z from 'zod';
import { db } from '../../mongo-database';
import { UserType } from '../types/user';

export const User = z.object({
  email: z.string().email({ message: "doesn't look like a email to me" }),
  username: z.string().min(1, { message: "Don't be lazy type a real password" })
    .max(80, { message: 'looks like a userbook lol' }),
  password: z.string().min(1, { message: "Don't be lazy type a real password" })
    .max(80, { message: 'password too long' }),
  discord: z.string().min(1, { message: 'google how to find my discord ID' }).max(80),
  confirmation: z.number().min(5).max(5, { message: 'stop spamming bro' }),
});

export const Users = db.collection<UserType>('Users');