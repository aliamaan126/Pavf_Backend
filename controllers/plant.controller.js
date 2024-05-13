import { myTimeZoneDate } from "../utils/helper.utils.js";
import { StatusCodes } from "../errors/ApiError.js";
import "core-js/actual/array/group-by.js"
import Plant from "../models/Plant.js";


export const addPlant = async (req, res, next) => {
  try {
    const newPlant = await new Plant(req.body).save();
    return res.status(StatusCodes.CREATED).json(newPlant);
      
  } catch (error) {
      next(error);
  }
};
export const getPlant = async (req, res, next) => {
  try {
    const { plant_name } = req.query;
    const newPlant = await Plant.findOne({ name: plant_name });
    return res.status(StatusCodes.OK).json(newPlant);
      
  } catch (error) {
      next(error);
  }
};
