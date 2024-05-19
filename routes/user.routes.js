import express from 'express';
import trimRequest from 'trim-request';
import { addPlant, deviceControl, passwordUpdate, profile, profileUpdate, registerDevice } from '../controllers/user.controller.js';


const userRouter = new express.Router();

// Add routes
userRouter.get('/', trimRequest.all, profile);
userRouter.post('/update', trimRequest.all, profileUpdate);
userRouter.post('/password/update', trimRequest.all, passwordUpdate);
userRouter.post('/deviceBind', trimRequest.all, registerDevice);
userRouter.post('/device-control', trimRequest.all, deviceControl);
userRouter.post('/add-plant', trimRequest.all, addPlant);



// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default userRouter;
