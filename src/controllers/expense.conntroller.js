const {Expense} = require("../models/expense.models.js");
const User = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const addExpense = asyncHandler( async (req,res,next) => {
    const { title , amount , type , category ,date} = req.body;

    const user = await User.findById(req.user?._id)

    if(!user){
        throw new ApiError(400, "User not found, please log in or register account.")
    }

   if (!title || !amount || !type || !category || !date) {
    throw new ApiError(400, "All fields are required");
}

    const expense = await Expense.create({
        title,amount,type , category ,date, owner: req.user?._id
    })

      if(type.toString() === "income"){
        await User.findByIdAndUpdate(req.user?._id,{
            $set: {
                balance : user.balance + Number(amount)
            }
        })
    }else{
        await User.findByIdAndUpdate(req.user?._id,{
            $set: {
                balance : user.balance - Number(amount)
            }
        })
    }

    return res.status(200).json(new ApiResponse(200, "Expense Add successfully", expense))
});

const updateExpense = asyncHandler(async (req,res,next) => {

})

module.exports = {addExpense}