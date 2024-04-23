import express from 'express';
import trimRequest from 'trim-request';
import { passwordUpdate, profile, profileUpdate, registerDevice } from '../controllers/user.controller.js';

const userRouter = new express.Router();

// Add routes
userRouter.get('/', trimRequest.all, profile);
userRouter.post('/update', trimRequest.all, profileUpdate);
userRouter.post('/password/update', trimRequest.all, passwordUpdate);
userRouter.post('/deviceBind', trimRequest.all, registerDevice);
// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default userRouter;
