import express from 'express';
import trimRequest from 'trim-request';
import { fetchSensorData, saveSensorData } from '../controllers/arduino.controller.js';

const arduinoRouter = new express.Router();

// Add routes
arduinoRouter.post('/sensor-data', trimRequest.all, saveSensorData);
arduinoRouter.post('/fetch-data', trimRequest.all, fetchSensorData);
// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default arduinoRouter;
