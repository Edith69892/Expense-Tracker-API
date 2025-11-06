const {Expense} = require("../models/expense.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiRresponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const addExpense = asyncHandler( async (req,res,next) => {
    const { title , amount , type , category ,date} = req.body;

    if([title, amount , type , category ,date].some(fields => !fields)){
        throw new ApiError(400,"All fields are required");
    }

    const expense = await Expense.create({
        title,amount,type , category ,date, owner: req.user?._id
    })

    return res.status(200).json(new ApiResponse(200, "Expense Add successfully", expense))
})