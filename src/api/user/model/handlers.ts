import { Users } from '.';
import { UserType, UserTypeWidthId } from '../types/user';


export const insertElement = async (elm:UserType):Promise<UserTypeWidthId> =>{
  const insertedElement = await Users.insertOne(elm);
  if (!insertedElement.acknowledged) throw new Error('Error inserting Users.');
  return ({
    _id: insertedElement.insertedId,
    ...elm,
  });
};

export const findElements = async ():Promise<UserTypeWidthId[] | []> => {
  const foundElement = await Users.find().toArray();
  return foundElement;
  
};


export const findElement = async (username:string, password:string):Promise<UserTypeWidthId | null> =>{
  const foundElement = await Users.findOne({
    username,
    password,
  });
  return foundElement;
};



