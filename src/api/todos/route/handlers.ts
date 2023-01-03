import { Router } from 'express';
import { Response, Request, NextFunction } from 'express';
import { ParamsWithId } from '../../../interfaces/zod-validation/ParamsWithId';
import { validateRequest } from '../../../middlewares/zod-validation/validation';
import * as TodoHandlers from '../services';
import { TodoType, TodoWithIdType } from '../types/todos.types';
import { Todo } from '../model';

const router = Router();

router.get('/', async (req: Request, res: Response<TodoWithIdType[] | []>,
  next: NextFunction) =>{
  try {
    const todos = await TodoHandlers.findAll();
    res.json(todos);
  } catch (error) {
    next(error);
  }

});

router.get(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }), async (req: Request<ParamsWithId, TodoWithIdType, {}>, res: Response<TodoWithIdType>, next: NextFunction) => {
    try {
      const result = await TodoHandlers.findOne(req.params.id);
      if (!result) {
        res.status(404);
        throw new Error(`Todo with id "${req.params.id}" not found.`);
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validateRequest({
    body: Todo,
  }),
  async (req: Request<{}, TodoWithIdType, TodoType>, res: Response<TodoWithIdType>, next: NextFunction) =>{
    try {
      const insertResult = await TodoHandlers.createOne(req.body);
      res.status(201);
      res.json(insertResult);
    } catch (error) {
      next(error);    
    }
  },
);
router.put(
  '/:id',
  validateRequest({
    params: ParamsWithId,
    body: Todo,
  }),
  async (req: Request<ParamsWithId, TodoWithIdType, TodoType>, res: Response<TodoWithIdType>, next: NextFunction) =>{
    try {
      const result = await TodoHandlers.updateOne(req.params.id, req.body);
      if (!result.value) {
        res.status(404);
        throw new Error(`Todo with id "${req.params.id}" not found.`);
      }
      res.json(result.value);
    } catch (error) {
      next(error);
    }

  },
);
router.delete(
  '/:id',
  validateRequest({
    params: ParamsWithId,
  }),
  async (req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) =>{
    try {
      const result = await TodoHandlers.deleteOne(req.params.id);
      if (!result.value) {
        res.status(404);
        throw new Error(`Todo with id "${req.params.id}" not found.`);
      }
      res.status(204).end();
    } catch (error) {
      next(error);
    } 
  },
);

export default router;
