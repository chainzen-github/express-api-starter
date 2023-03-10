import { NextFunction, Router, Request, Response } from 'express';
import { findElement, findElements, insertElement } from '../model/handlers';
import { UserType, UserTypeWidthId } from '../types/user';
import { validateRequest } from '../../../middlewares/zod-validation/validation';
import { User } from '../model';
import {  ParamsWithUsername } from '../../../interfaces/zod-validation/ParamsWithId';



const router = Router();


// Get all users 
router.get('/', async (req:Request<{}, UserTypeWidthId[] | [], {}>, res:Response<UserTypeWidthId[] | []>, next:NextFunction) => {
  try {
    const foundElement = await findElements();
    res.status(200).json(foundElement);
  } catch (err) {
    next(err);
  }
});



// Resgister New User 
router.post('/', validateRequest({ body: User }), async (req:Request<{}, UserTypeWidthId,
UserType>,
res:Response<UserTypeWidthId>, next:NextFunction  ) =>{
  try {
    const insertedElement = await insertElement(req.body);
    res.status(201).json(insertedElement);
  } catch (err) {
    next(err);
  }
});

// Login A New User
router.get(
  '/:username/:password',
  validateRequest({
    params: ParamsWithUsername,
  }), async (req: Request<ParamsWithUsername, UserTypeWidthId, {}>,
    res: Response<UserTypeWidthId>, next: NextFunction) => {
    try {
      const result = await findElement(req.params.username, req.params.password);
      if (!result) {
        res.status(404);
        throw new Error('Invalid login or password');
      }
      res.json(result);
    } catch (error) {
      next(error);
    }
  },
);





export default router;