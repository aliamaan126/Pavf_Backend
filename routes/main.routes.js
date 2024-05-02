import express from 'express';
import { StatusCodes } from '../errors/ApiError.js';
import { roleSeeder, userSeeder } from '../database/seeders/seeder.js';

const mainRouter = new express.Router();

// Add routes
mainRouter.get('/', async (req, res) => {
  return res.json({
    message: 'Welcome to Api Server ',
  });
});

mainRouter.get('/seeder', async (req, res) => {
  const { password } = req.query;
  if (password === '123456') {
    const roleData = await roleSeeder(['Admin', 'User']);
    return res.status(StatusCodes.CREATED).json({ roleData });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Authenticated',
    });
  }
});

mainRouter.post('/sensor-data', async (req, res , next ) => {
  try {
      console.log(req.body);

      return res.json(req.body);
  } catch (error) {
      next(error);
  }
});

export default mainRouter;
