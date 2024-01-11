import { StatusCodes } from '../errors/ApiError.js';
import { storeData } from '../services/device.service.js';

export const getdata = async (req, res, next) => {
    const sensorData = await storeData(req.body);
  res.status(StatusCodes.CREATED).json(sensorData);

};
