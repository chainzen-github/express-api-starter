import { insertElement } from './model/handlers';
import { UserType } from './types/user';

export const createOne = async (elem:UserType) => {
  const insertedResult = await insertElement(elem);
  return insertedResult;
};
