import express from 'express';
import trimRequest from 'trim-request';
import { getdata } from '../controllers/device.controller.js';

const deviceRouter = new express.Router();

// Add routes
deviceRouter.post('/data/store', trimRequest.all, getdata);

export default deviceRouter;
