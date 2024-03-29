import express from 'express';
import trimRequest from 'trim-request';
import { readData, storeData } from '../controllers/device.controller.js';

const deviceRouter = new express.Router();

// Add routes
deviceRouter.post('/data/store', trimRequest.all, storeData);
deviceRouter.get('/data/:id/fetch', trimRequest.all, readData);

export default deviceRouter;
