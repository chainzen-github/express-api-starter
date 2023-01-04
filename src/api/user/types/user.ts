import * as z from 'zod';
import { User } from '../model';
import { WithId } from 'mongodb';


export type UserType = z.infer<typeof User>;
export type UserTypeWidthId = WithId<UserType>;