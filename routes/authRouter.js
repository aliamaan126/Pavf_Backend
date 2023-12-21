import { Router } from 'express';
import { login, register } from '../controllers/authController.js';

const authRouter = new Router();

// Add routes
authRouter.post('/register', register);
authRouter.post('/login', login);
// authRouter.post('/', SessionController.store);
// authRouter.put('/', SessionController.store);
// authRouter.delete('/', SessionController.store);

export default authRouter;
