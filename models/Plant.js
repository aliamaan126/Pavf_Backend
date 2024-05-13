import mongoose from 'mongoose';

const PlantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name Is Required'],
      unique: [true, 'Name Already Exist'],
    },
    temprature:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
        },
    moisture:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
        },
    electrical_conductivity:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
        },
    humidity:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
    },
    nitrogen:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
    },
    phosphorus:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
    },
    potassium:{
      type: Object,
      required: true,
      default: {min:1 , max:1}
    }
   
  },
  {
    collection: 'plants',
    timestamps: true,
  }
);

export default mongoose.model('Plant', PlantSchema);
