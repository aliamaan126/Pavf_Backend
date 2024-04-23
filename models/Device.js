import mongoose from 'mongoose';

const DeviceSchema = new mongoose.Schema(
  {
    deviceID: {
      type: String,
      required: [true, 'Device ID Is Required'],
      unique: [true, 'Device ID Already Exist'],
    },
    shelfs:[ {
      shelfId: String,
      isConfigured: {type:Boolean,default:false},
      data:{
        type: Object,
        default:{}
      },
    }],
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
