import express from 'express';
import todos from './todos/route/handlers';
import user from './user/route/handlers';


const router = express.Router();

router.use('/user', user );
router.use('/todos', todos);


export default router;
