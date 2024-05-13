import express from 'express';
import trimRequest from 'trim-request';
import { getSingleShelfSensorData, getSingleShelfSingleElementData, saveSensorData } from '../controllers/arduino.controller.js';

const arduinoRouter = new express.Router();

// Add routes
arduinoRouter.post('/sensor-data', trimRequest.all, saveSensorData);
arduinoRouter.get('/single-shelf-sensor-data', trimRequest.all, getSingleShelfSensorData);
arduinoRouter.get('/single-shelf-single-element', trimRequest.all, getSingleShelfSingleElementData);
// routerName.post('/', SessionController.store);
// routerName.put('/', SessionController.store);
// routerName.delete('/', SessionController.store);

export default arduinoRouter;
