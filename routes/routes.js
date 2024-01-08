import express from 'express';
import auth from '../middlewares/auth.js';
import mainRouter from './mainRouter.js';
import authRouter from './authRouter.js';
import userRouter from './user.routes.js';

const routes = new express.Router();

routes.use('/', mainRouter);
routes.use('/auth', authRouter);
routes.use('/profile', auth, userRouter);

export default routes;
