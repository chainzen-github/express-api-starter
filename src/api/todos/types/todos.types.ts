import * as z from 'zod';
import { Todo } from '../model';
import { WithId } from 'mongodb';


export type TodoType = z.infer<typeof Todo>;
export type TodoWithIdType = WithId<TodoType>;