import { deleteElement, findElement, findElements, insertElement, updateElement } from './model/handlers';
import { TodoType } from './types/todos.types';

export const findAll = async () => {
  const foundElements = await findElements();
  return foundElements;
};

export const findOne = async (elem:string) => {
  const foundElement = await findElement(elem);
  return foundElement;
};

export const createOne = async (elem:TodoType) => {
  const insertedResult = await insertElement(elem);
  return insertedResult;
};

export const updateOne = async (id:string, elem:TodoType) => {
  const updatedResult = await updateElement(id, elem);
  return updatedResult;
};

export const deleteOne = async (elem:string) => {
  const deletedElement = await deleteElement(elem);
  return deletedElement;
};