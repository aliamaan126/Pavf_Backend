import express from 'express';
import trimRequest from 'trim-request';
import { createDevice, readData, storeData } from '../controllers/device.controller.js';

const   deviceRouter = new express.Router();

// Add routes
deviceRouter.post('/data/store', trimRequest.all, storeData);
deviceRouter.post('/create', trimRequest.all, createDevice);
deviceRouter.get('/data/:id/fetch', trimRequest.all, readData);

export default deviceRouter;
