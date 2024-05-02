import Device from "../models/Device.js";

export const saveSensorData = async (req, res, next) => {
    try {

        const { deviceID, shelfID, shelfData_01 } = req.body;

        // Find the device based on deviceID
        const device = await Device.findOne({ deviceID });
        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        const newShelfData = device.shelfs.map((shelf) => {
            if (shelf.shelf_id === shelfID) {
                shelf.soil_data.push({...shelfData_01,DateTime:new Date().toLocaleString()}); 
            }
            return shelf;
        });
        device.shelfs = newShelfData;
        console.log(device);
        await device.save(); 

        res.json({ message: 'Device updated successfully', device });
    } catch (error) {
        console.error('Error saving sensor data:', error);
        next(error);
    }
};


export const fetchSensorData = async (req, res, next) => {
    try {
        const { deviceID} = req.body;

        // Find the device in the database based on deviceID
        const device = await Device.findOne({ deviceID });

        if (!device) {
            return res.status(404).json({ message: 'Device not found' });
        }
        return res.json({ device });
    } catch (error) {
        // Handle errors
        console.error('Error fetching sensor data:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};