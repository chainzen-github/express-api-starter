import express from 'express';
import todos from './handlers';

const router = express.Router();

router.use('/todos', todos);

export default router;
