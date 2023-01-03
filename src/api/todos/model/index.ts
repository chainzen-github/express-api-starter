import * as z from 'zod';
import { db } from '../../mongo-database';
import { TodoType } from '../types/todos.types';

export const Todo = z.object({
  content: z.string().min(1),
  done: z.boolean(),
});

export const Todos = db.collection<TodoType>('todos');
