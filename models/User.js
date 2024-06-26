import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import { generateToken } from '../services/token.service.js';
import maap from 'mongoose-autopopulate';
import Role from './Role.js';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Username Is Required'],
      unique: [true, 'Username Already Exist'],
    },
    email: {
      type: String,
      required: [true, 'Email Is Required'],
      unique: [true, 'Email Already Exist'],
      lowercase: true,
      validate: {
        validator: validator.isEmail,
        message: 'Please Enter A Valid Email',
      },
    },
    password: {
      type: String,
      required: [true, 'Passwod Is Required'],
      minlength: 6,
      select: false,
    },
    firstname: {
      type: String,
      trim: true,
      maxlength: 20,
      default: '',
    },
    lastname: {
      type: String,
      trim: true,
      maxlength: 20,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    address: {
      type: String,
      trim: true,
      maxlength: 30,
      default: '',
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
    },
    devices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Device"
      }
    ],
    status:{
      require: true,
      type:Boolean,
      default: true,
    }
  },
  {
    collection: 'users',
    timestamps: true,
  }
);

UserSchema.plugin(maap);
UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(12);
      this.password = await bcrypt.hash(this.password, salt);
    }
    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.createAccessToken = async function () {
  return await generateToken(
    { userId: this._id },
    '1d',
    process.env.JWT_SECRET
  );
};

UserSchema.methods.createRefreshToken = async function () {
  return await generateToken(
    { userId: this._id },
    '30d',
    process.env.JWT_REFRESH_SECRET
  );
};

UserSchema.methods.newUserResponse =  function () {
  const res = this.toObject();
  // const getRole = await Role.findById(res.role);
  res.role = res.role.name;
  // console.log(getRole);
  delete res['password'];
  delete res['__v'];
  return res;
};

UserSchema.methods.loginResponse = function () {
  const res = this.toObject();
  res.role = res.role.name;
  delete res['password'];
  delete res['__v'];
  delete res['createdAt'];
  delete res['updatedAt'];
  return res;
};

UserSchema.methods.publicResponse = function () {
  const res = this.toObject();
  res.role = res.role.name;
  delete res['password'];
  delete res['__v'];
  delete res['createdAt'];
  delete res['updatedAt'];
  return res;
};

UserSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = await bcrypt.compare(userPassword, this.password);
  return isMatch;
};


export default mongoose.model('User', UserSchema);