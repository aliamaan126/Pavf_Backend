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
  const { password } = req.body;
  if (password === 'lord123!@#') {
    const roleData = await roleSeeder(['Admin', 'User']);
    return res.status(StatusCodes.CREATED).json({ roleData });
  } else {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Authenticated',
    });
  }
});


export default mainRouter;
