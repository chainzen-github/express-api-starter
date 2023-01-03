import { client } from '../src/api/mongo-database';
import { Todos } from '../src/api/todos/model';

global.afterAll(async () => {
  await client.close();
});
global.beforeAll(async () =>{
  await client.connect();
})
