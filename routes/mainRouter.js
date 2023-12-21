import { Router } from 'express';

const mainRouter = new Router();

// Add routes
mainRouter.get('/', (req, res) => {
  return res.status(200).json({ message: 'Welcome to Api Server' });
});
// mainRouter.post('/', SessionController.store);
// mainRouter.put('/', SessionController.store);
// mainRouter.delete('/', SessionController.store);

export default mainRouter;
