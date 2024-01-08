import ApiError, { StatusCodes } from '../errors/ApiError.js';
import User from '../models/User.js';
export const findUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user)
    throw new ApiError('Invalid User Request', StatusCodes.BAD_REQUEST);
  return user;
};

export const findUserByEmail = async (userEmail) => {
  const user = await User.findOne({ email: userEmail });
  if (!user)
    throw new ApiError(
      'User Does Not Exist In Our Database',
      StatusCodes.BAD_REQUEST
    );
  return user;
};


