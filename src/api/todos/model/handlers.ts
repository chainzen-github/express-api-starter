import { ModifyResult, ObjectId } from 'mongodb';
import { Todos } from '.';
import { TodoType, TodoWithIdType } from '../types/todos.types';


export const findElements = async ():Promise<TodoWithIdType[] | []> =>{
  const foundElements = await Todos.find().toArray();
  return foundElements;
};

export const insertElement = async (elm:TodoType):Promise<TodoWithIdType> =>{
  const insertedElement = await Todos.insertOne(elm);
  if (!insertedElement.acknowledged) throw new Error('Error inserting todo.');
  return ({
    _id: insertedElement.insertedId,
    ...elm,
  });
};

export const findElement = async (elm:string):Promise<TodoWithIdType | null> =>{
  const foundElement = await Todos.findOne({
    _id: new ObjectId(elm),
  });
  return foundElement;
};

export const updateElement = async (elmId:string, elmSetter:TodoType):Promise<ModifyResult<TodoType>> =>{
  const updatedElement = await Todos.findOneAndUpdate({
    _id: new ObjectId(elmId),
  }, {
    $set: elmSetter,
  }, {
    returnDocument: 'after',
  });
  return updatedElement;
};

export const deleteElement = async (elmId:string):Promise<ModifyResult<TodoType>> =>{
  const deletedElement = await Todos.findOneAndDelete({
    _id: new ObjectId(elmId),
  });
  return deletedElement;

};