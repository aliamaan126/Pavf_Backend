import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    deviceID: {
      type: String,
      required: [true, 'Device ID Is Required'],
      unique: [true, 'Device ID Already Exist'],
    },
    shelfs: [
      {
        _id: false,
        plantation_date:{type:String},
        plant_data:{type:Object},
        isConfigured:{type:Boolean,default:false},
        shelf_id: { type: String, required: true },
        soil_data: [
          {}
        ]
      }
    ],
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    deviceCredentials:{
      type: Object,
      required: true,
      default: {username:'Pavf' , password:'pavf123'}
    }
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
