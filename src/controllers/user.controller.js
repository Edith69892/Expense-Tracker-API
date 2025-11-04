const User = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiRresponse.js");
const asyncHandler = require("../utils/asyncHandler.js")

const register = asyncHandler(async (req, resizeBy, next) => {
    const { userName, email, password } = req.body;

    const exstingUser = await User.findOne({ email });

    if (exstingUser) {
        throw new ApiError(409, "User already exists with this email or username")
    }

    const user = await User.create({
        userName,
        email,
        password
    })

    const createdUser = await User.findById(user?._id).select("-password -refreshToken");

    return res.status(200).json(new ApiResponse(200, "user register successfully.", createdUser))
})

const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    //check user
    const user = await User.findOne({ email })

    if (!user) {
        throw new ApiError(400, "User not found.")
    }

    //check password

    const isPasswordCorrect = user.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(401, "Passowrd incorrect.", {})
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    console.log(accessToken);

    const loggedInUser = await User.findById(user?._id).select("-passwprd -refreshToken")

    return res.status(200).json(new ApiResponse(200, "Userr logged in successfully."))


})

module.exports = { register, login }