import { StatusCodes } from '../errors/ApiError.js';
import Device from '../models/Device.js';
import { retrieveData, storeData as sd } from '../services/device.service.js';

export const storeData = async (req, res, next) => {
    const sensorData = await sd(req.body);
  res.status(StatusCodes.CREATED).json(sensorData);
};

export const readData = async (req, res, next) => {
  try {
    const {id} = req.params;
    const sensor = await Device.findOne({deviceID:id});
    
    res.status(200).json(sensor);
  } catch (error) {
    next(error);
  }
};

export const deleteData = async (req, res, next) => {
  try {
    const sensorData = await retrieveData(req.body);
    res.status(201).json(sensorData);
  } catch (error) {
    next(error);
  }
};