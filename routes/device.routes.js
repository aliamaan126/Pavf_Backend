import express from 'express';
import trimRequest from 'trim-request';
import { createDevice, readData, readShelfData, storeData } from '../controllers/device.controller.js';

const   deviceRouter = new express.Router();

// Add routes
deviceRouter.post('/data/store', trimRequest.all, storeData);
deviceRouter.post('/create', trimRequest.all, createDevice);
deviceRouter.get('/:id/fetch', trimRequest.all, readData);
deviceRouter.get('/data/:id/fetch', trimRequest.all, readShelfData);


export default deviceRouter;
