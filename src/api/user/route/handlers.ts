import { NextFunction, Router, Request, Response } from 'express';
import { insertElement } from '../model/handlers';
import { UserType, UserTypeWidthId } from '../types/user';
import { validateRequest } from '../../../middlewares/zod-validation/validation';
import { User } from '../model';


const route = Router();


route.post('/', validateRequest({ body: User }), async (req:Request<{}, UserTypeWidthId, UserType>,
  res:Response<UserTypeWidthId>, next:NextFunction  ) =>{
  try {
    const insertedElement = await insertElement(req.body);
    res.status(201).json(insertedElement);
  } catch (err) {
    next(err);
  }

});

export default route;