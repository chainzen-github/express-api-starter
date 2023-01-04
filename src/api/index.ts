import express from 'express';
import todos from './todos/route/handlers';
import user from './user/route/handlers';


const router = express.Router();

router.use('/todos', todos);
router.use('/user', user );

export default router;
