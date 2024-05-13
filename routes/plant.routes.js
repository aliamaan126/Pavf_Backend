import express from 'express';
import trimRequest from 'trim-request';
import { addPlant,getPlant  } from '../controllers/plant.controller.js';

const plantRouter = new express.Router();

// Add routes
plantRouter.post('/create', trimRequest.all, addPlant);
plantRouter.get('/get-single-plant', trimRequest.all, getPlant);
// plantRouter.get('/get-all-plant', trimRequest.all, getAllPlant);

export default plantRouter;
