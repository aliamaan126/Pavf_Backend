import {  StatusCodes } from "../errors/ApiError.js";
import Device from "../models/Device.js";
import { myTimeZoneDate } from "../utils/helper.utils.js";
import "core-js/actual/array/group-by.js"

export const saveSensorData = async (req, res, next) => {
    try {
        console.log(req.body);
        const { deviceID,shelfData_01 } = req.body; 
        const device = await Device.findOne({ deviceID: deviceID });
        const newShelfs = device.shelfs.map((s) => {
          if (s.shelf_id == '1') {
            s.soil_data =[...s.soil_data,{...shelfData_01,date_time:myTimeZoneDate()}]        
            }
          return s
        })
        await device.updateOne({shelfs:newShelfs})
        return res.status(StatusCodes.ACCEPTED).json(device);
        
      } catch (error) {
        next(error);
      }
};

export const getSingleShelfSensorData = async (req, res, next) => {
    try {
      const { deviceId, shelfId } = req.query
      const device = await Device.findOne({deviceID:deviceId})
      const desireShelfData = device.shelfs.filter((shelf) => {
          return shelf.shelf_id == shelfId
        })
      const soilData = desireShelfData[0].soil_data
      // const res = Object.groupBy(soilData,({})=>{})
        return res.status(StatusCodes.ACCEPTED).json(soilData);
        
      } catch (error) {
        next(error);
      }
  };
  export const getSingleShelfSingleElementData = async (req, res, next) => {
    // try {
      const { deviceId, shelfId,element } = req.query
      const device = await Device.findOne({deviceID:deviceId})
      const desireShelfData = device.shelfs.filter((shelf) => {
          return shelf.shelf_id == shelfId
        })
    const soilData = desireShelfData[0].soil_data.map((d) => {
      let ob = { date_time: d.date_time }
      ob[element] = d[element]
        return ob
      })
      // const groupb = Object.groupBy(soilData,(data)=> data.date)
      const peopleByAge = soilData.groupBy((d)=>d.date_time.split(',')[0])
      // const res = Object.groupBy(soilData,({})=>{})
        return res.status(StatusCodes.ACCEPTED).json(peopleByAge);
        
      // } catch (error) {
        // next(error);
      // }
  };

export const fetchDevicePlants = async (req, res, next) => {
  try {
    const { deviceId } = req.query;
    const device = await Device.findOne({deviceID:deviceId}) 
    const data = device.shelfs.map((shelf)=>{

      return {
        shelfId:shelf.shelf_id,
        plantData:shelf.plant_data
      }
    })
    return res.status(StatusCodes.ACCEPTED).json({action:"loadplantdata",data:[...data]})} catch (error) {
    next(error);
  }
}