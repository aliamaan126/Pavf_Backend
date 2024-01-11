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