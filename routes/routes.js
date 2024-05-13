import express from 'express';
import mainRouter from './main.routes.js';
import authRouter from './auth.routes.js';
import userRouter from './user.routes.js';
import auth from '../middlewares/auth.js';
import deviceRouter from './device.routes.js';
import arduinoRouter from './arduino.routes.js';
import plantRouter from './plant.routes.js';

const routes = new express.Router();

routes.use('/', mainRouter);
routes.use('/auth', authRouter);
routes.use('/profile', auth, userRouter);
routes.use('/device', deviceRouter);
routes.use('/arduino', arduinoRouter);
routes.use('/plant', auth,plantRouter);

export default routes;
