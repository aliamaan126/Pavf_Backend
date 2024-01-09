import express from 'express';
import mainRouter from './main.routes.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import auth from '../middlewares/auth.js';
import deviceRouter from './device.routes.js';

const routes = new express.Router();

routes.use('/', mainRouter);
routes.use('/auth', authRouter);
routes.use('/profile', auth, userRouter);
routes.use('/device', auth, deviceRouter);

export default routes;
