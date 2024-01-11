import Device from "../models/Device.js"

export const storeData= async (deviceData)=>{
    const newData = await new Device(
        {
            deviceID:deviceData.deviceID,
            soildata:deviceData.data
        }
    ).save();
    return newData;
}