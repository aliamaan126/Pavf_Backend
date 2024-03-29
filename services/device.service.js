import ApiError from "../errors/ApiError.js";
import Device from "../models/Device.js"

export const storeData= async (deviceData)=>{
    const getData = await Device.findOne({
        deviceID:deviceData.deviceID
    })
    if(getData)
    {
        const updateData = await Device.findOneAndUpdate(
            {deviceID: deviceData.deviceID},{soildata: deviceData.data},{new:true}
        )
        return updateData;
    }
    const newData = await new Device(
        {
            deviceID:deviceData.deviceID,
            soildata:deviceData.data
        }
    ).save();
    return newData;
}


export const retrieveData = async (deviceID) => {
    try {
      const deviceData = await Device.findOne({ deviceID : deviceID});
      return deviceData;
    } catch (error) {
      console.error('Error while fetching data by device ID:', error);
      throw new Error('Failed to fetch data by device ID');
    }
  };

//   export const findDeviceById = async (deviceID) => {
//     const device = await Device.findOne({ deviceID: deviceID });
//     if (!device)
//       throw new ApiError(
//         'Device Does Not Exist In Our Database',
//         StatusCodes.BAD_REQUEST
//       );
//     return device;
//   };