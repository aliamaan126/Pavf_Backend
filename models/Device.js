import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    deviceID: {
      type: String,
      required: [true, 'Device ID Is Required'],
      unique: [true, 'Device ID Already Exist'],
    },
    soildata: {
      type: Object,
      default:{}
    },
    // permissions: {
    //   type: Array,
    //   required: [true, 'At least One Permission Required'],
    // },
  },
  {
    collection: 'devices',
    timestamps: true,
  }
);

export default mongoose.model('Device', DeviceSchema);
