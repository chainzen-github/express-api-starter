import { Users } from '.';
import { UserType, UserTypeWidthId } from '../types/user';


export const insertElement = async (elm:UserType):Promise<UserTypeWidthId> =>{
  const insertedElement = await Users.insertOne(elm);
  if (!insertedElement.acknowledged) throw new Error('Error inserting todo.');
  return ({
    _id: insertedElement.insertedId,
    ...elm,
  });
};
