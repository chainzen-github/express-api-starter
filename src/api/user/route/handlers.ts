import { NextFunction, Router, Request, Response } from 'express';
import { findElements, insertElement } from '../model/handlers';
import { UserType, UserTypeWidthId } from '../types/user';
import { validateRequest } from '../../../middlewares/zod-validation/validation';
import { User } from '../model';



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
router.post('/', validateRequest({ body: User }), async (req:Request<{}, UserTypeWidthId, UserType>,
  res:Response<UserTypeWidthId>, next:NextFunction  ) =>{
  try {
    const insertedElement = await insertElement(req.body);
    res.status(201).json(insertedElement);
  } catch (err) {
    next(err);
  }
});

export default router;