const User = require("../models/user.models");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken")

const verifyJwt = asyncHandler(async(req,_  ,next) => {
    const token = req.cookies?.accessToken || req.headers?.authorization.replace("Bearer ", "")

    if(!token){
        throw new ApiError(400, "Token required.")
    }

    const decodeToken =  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

    if(!decodeToken){
        throw new ApiError(401, "Invalid or expired token.")
    }

    const user = await User.findById(decodeToken?._id).select("-password -refreshToken")

    if(!user){
        throw new ApiError(400, "user not found.")
    }

    req.user = user
    next()
})

module.exports = verifyJwt;