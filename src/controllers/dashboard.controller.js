const { Expense } = require("../models/expense.models.js");
const User = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const dashboard = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user?._id);

    if (!user) throw new ApiError(400, "Please loged in or register account.");

    const result = await Expense.aggregate([
        {
            $match: { owner: user?._id }
        },
        {
            $group: {
                _id: null,
                totalIncome: {
                    $sum: {
                        $cond: [
                            {$eq: ["$type", "income"]},
                            "$amount",
                            0
                        ]
                    }
                },
                totalExpense: {
                    $sum: {
                        $cond: [
                            {$eq: ["$type", "expense"]},
                            "$amount",
                            0
                        ]
                    }
                }
            }
        }
    ]);

    const income = result[0]?.totalIncome || 0;
    const expense = result[0]?.totalExpense || 0;
    const balance = income - expense;

    return res.status(200).json({
        income,
        expense,
        balance
    })
})

module.exports = { dashboard }