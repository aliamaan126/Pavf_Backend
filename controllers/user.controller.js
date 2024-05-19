import fs from 'fs';
import validator from 'validator';
import ApiError, { ReasonPhrases, StatusCodes } from '../errors/ApiError.js';
import Device from '../models/Device.js';
import User from '../models/User.js';
import { findUser } from '../services/user.service.js';
import bcrypt from 'bcryptjs';
import path,{dirname} from 'path';
import { fileURLToPath } from 'url';
import { uploadImage } from '../services/imageUpload.service.js';
import { response } from 'express';
// import { pavfSoc } from '../server.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const profile = async (req, res, next) => {
  try {
    const user = await findUser(req.user.userId);
    res.json({
      user: user.publicResponse(),
    });
  } catch (error) {
    next(error);
  }
};

export const registerDevice = async (req, res, next) => {
  try {
    const user = await findUser(req.user.userId);
    const {username , password} = req.body
    const  device = await Device.findOne({deviceCredentials:{username:username,password:password}})
    // console.log(device);
    if(device.user!=null)
    throw new ApiError("Device already Connected to User",StatusCodes.UNAUTHORIZED);

    await device.updateOne({user:user._id});
    user.devices.push(device._id)
    await user.updateOne({devices:user.devices})

    if(!device)
    {
      throw new ApiError ({ device:"Device does not Exist or Invalid Credentials "}, StatusCodes.BAD_REQUEST)
    }

    // await user.updateOne({devices:[...user.devices, device._id]},{new:true});

    res.json({
      user: user.publicResponse(),
    });
  } catch (error) {
    next(error);
  }
};

export const profileUpdate = async (req, res, next) => {
  const { firstname, lastname,address } = req.body;
  const newData = { firstname: firstname, lastname: lastname, address: address };
 try {
   const user = await findUser(req.user.userId);
   if (req.files) {
    
     const image = req.files.user_image;
     if (image) {
       
       const dirPath = path.resolve(__dirname, '../public/storage/users');
       if (user.image !== '') {
         fs.unlink(`${dirPath}/${user.image}`,(err)=>{})
       }
        const upresult = await uploadImage(image, dirPath, user.username)
        if (upresult.status == false) {
          throw new ApiError('Image Upload Failed',StatusCodes.INTERNAL_SERVER_ERROR)
        }
        else {
          newData.image = upresult.image_name;
          
        }
      }
    }
   await user.updateOne(newData)
   return res.status(StatusCodes.ACCEPTED).json();
 } catch (error) {
   next(error);
 }
};

export const passwordUpdate = async (req, res, next) => {
  try {
   const errors = {};
  const {currentPassword,newPassword,password_confirmation,} = req.body;

  !currentPassword
    ? (errors.currentPassword = 'Current Password is required')
    : null;
  !newPassword
    ? (errors.newPassword = 'New Password is Required')
    : !validator.equals(newPassword,password_confirmation)
    ? (errors.password_confirmation = 'New Password and confirm password mis-match')
    : null;
  // check fields are empty
  if (Object.keys(errors).length > 0) {
    throw new ApiError(errors, StatusCodes.BAD_REQUEST);
    }
    
    const user = await User.findById(req.user.userId).select('+password');
    
    const checkCurrendPassword = await bcrypt.compare(currentPassword, user.password);
    console.log(checkCurrendPassword);
    if (!checkCurrendPassword)
      throw new ApiError('Does not match existing password', StatusCodes.UNAUTHORIZED);
    const salt = await bcrypt.genSalt(12);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    await user.updateOne({ password: hashedNewPassword });
   return res.status(StatusCodes.ACCEPTED).json();
 } catch (error) {
   next(error);
 }
};


export const deviceControl = async (req, res, next) => {
  try {
    const { deviceID,action,state,value } = req.body;
    const bdata = {
        deviceID:deviceID,
        action: action,
        state: state,
        value:value
      }
      // pavfSoc.pwss.broadcast(JSON.stringify(bdata));
    res.status(StatusCodes.OK).json(ReasonPhrases.OK);
  } catch (error) {
    next(error);
  }
}


export const addPlant = async (req, res, next) => {
  try {
    const {deviceId,shelfId,plantation_date,plant_data}= req.body;
    const device = await Device.findOne({ deviceID: deviceId });

    const newShelfs = device.shelfs.map((shelf)=>{
      if(shelf.shelf_id==shelfId){
        shelf.plantation_date=plantation_date;
        shelf.plant_data=plant_data;
      }
      return shelf;
    });
    await device.updateOne({shelfs:newShelfs})

    return res.status(StatusCodes.ACCEPTED).json(device);
  } catch (error) {
    next(error)
  }
}
