import {StatusCodes } from '../errors/ApiError.js';
import Device from '../models/Device.js';
import { retrieveData, storeData as sd } from '../services/device.service.js';
import { v4 as uuidv4 } from 'uuid';

export const storeData = async (req, res, next) => {
    const sensorData = await sd(req.body);
  res.status(StatusCodes.CREATED).json(sensorData);
};

export const readData = async (req, res, next) => {
  try {
    const {id} = req.params;
    const device = await Device.findOne({_id:id});
    
    res.status(200).json(device);
  } catch (error) {
    next(error);
  }
};
export const readShelfData = async (req, res, next) => {
  try {
    const {id} = req.params;
    const device = await Device.findOne({deviceID:id});
    
    res.status(200).json(device.shelfs);
  } catch (error) {
    next(error);
  }
};

export const allDevices = async (req, res, next) => {
  try {
    const devices =await Device.find({})
    
    res.status(200).json(devices);
  } catch (error) {
    next(error);
  }
};

export const createDevice = async (req, res, next) => {
  try {
    const { username, password, shelf_data } = req.body;
    const newDevice = new Device();

    newDevice.deviceID = uuidv4();
    if(username && password){
      newDevice.deviceCredentials = {username:username, password:password}
    }
    newDevice.shelfs = [...shelf_data];
   
    await newDevice.save();
    res.status(200).json(newDevice);

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


