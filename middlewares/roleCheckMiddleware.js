const { ApiError, StatusCodes } = require("../errors/ApiError");
const User = require("../models/User");

const roleCheckMiddleware = (role) => {
    return async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId)
        await user.populate({ path: 'role', select: '-_id name' })
        if (user.role.name.toLowerCase() != role.toLowerCase()) 
        {
            throw new ApiError('Invalid Role For This Action',StatusCodes.UNAUTHORIZED)
        }
        next()
    } catch (error) {
        next(error);
    }
}

}
 
module.exports = roleCheckMiddleware;