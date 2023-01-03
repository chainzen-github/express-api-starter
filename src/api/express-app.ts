import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
require('dotenv').config();
import { notFound, errorHandler } from '../middlewares/error-handling/error-handling';
import api from './todos/route';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
// Version one of the api
app.use('/api/v1', api);

app.use(notFound);
app.use(errorHandler);

export default app;
