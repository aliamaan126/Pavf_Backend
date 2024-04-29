import express from 'express';
import trimRequest from 'trim-request';
import { saveSensorData } from '../controllers/arduino.controller.js';

const arduinoRouter = new express.Router();

// Add routes
arduinoRouter.post('/sensor-data', trimRequest.all, saveSensorData);
// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default arduinoRouter;
