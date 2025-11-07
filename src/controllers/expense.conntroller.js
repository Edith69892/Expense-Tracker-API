const { Expense } = require("../models/expense.models.js");
const User = require("../models/user.models.js");
const ApiError = require("../utils/ApiError.js");
const ApiResponse = require("../utils/ApiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

const addExpense = asyncHandler(async (req, res, next) => {
    const { title, amount, type, category, date } = req.body;

    const user = await User.findById(req.user?._id)

    if (!user) {
        throw new ApiError(400, "User not found, please log in or register account.")
    }

    if (!title || !amount || !type || !category || !date) {
        throw new ApiError(400, "All fields are required");
    }

    const expense = await Expense.create({
        title, amount, type, category, date, owner: req.user?._id
    })

    if (type.toString() === "income") {
        await User.findByIdAndUpdate(req.user?._id, {
            $set: {
                balance: user.balance + Number(amount)
            }
        })
    } else {
        await User.findByIdAndUpdate(req.user?._id, {
            $set: {
                balance: user.balance - Number(amount)
            }
        })
    }

    return res.status(200).json(new ApiResponse(200, "Expense Add successfully", expense))
});

const updateExpense = asyncHandler(async (req, res, next) => {
    const { expenseId } = req.params;

    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(400, "User not found, please log in or register account.");
    if (!expenseId) throw new ApiError(400, "Expense Id Invalid.");

    const expense = await Expense.findById(expenseId);
    if (!expense) throw new ApiError(400, "Expense not found.");

    if (expense.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this expense.");
    }

    // old signed
    const oldExpenseAmount =
        expense.type === "income"
            ? Number(expense.amount)
            : -Number(expense.amount);

    // new values
    const newAmount =
        req.body.amount !== undefined ? Number(req.body.amount) : Number(expense.amount);

    const newType = req.body.type || expense.type;

    const newExpenseAmount = newType === "income" ? newAmount : -newAmount;

    // calculate difference
    const difference = newExpenseAmount - oldExpenseAmount;

    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        { $set: { balance: user.balance + difference } },
        { new: true }
    );

    // update expense fields
    expense.title = req.body.title || expense.title;
    expense.amount = newAmount;
    expense.type = newType;
    expense.category = req.body.category || expense.category;
    expense.date = req.body.date || expense.date;

    await expense.save();

    return res
        .status(200)
        .json(new ApiResponse(200, "Expense updated successfully.", { expense, balance: updatedUser }));
});

const deleteExpense = asyncHandler(async (req, res, next) => {
    const { expenseId } = req.params;

    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(400, "User not found, please log in or register account.");
    if (!expenseId) throw new ApiError(400, "Expense Id Invalid.");

    const expense = await Expense.findById(expenseId);
    if (!expense) throw new ApiError(400, "Expense not found.");

    if (expense.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Not authorized to update this expense.");
    }

    const updateAmount = expense.type === "income" ? Number(expense.amount) : -Number(expense.amount)

    const updatedUser = await User.findByIdAndUpdate(user?._id,
        {
            $set: { balance: user.balance - updateAmount }
        },
        {
            new: true
        }
    )

    await Expense.findByIdAndDelete(expense?._id);

    return res.status(200).json(new ApiResponse(200, "Expense deleted successfully.", {
        deletedExpense: expense,
        balance: updatedUser.balance
    }))
})

const getAllTransactions = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user?._id);

    if (!user) throw new ApiError(400, "User not found, please log in or register account.");

    const expenses = await Expense.find({ owner: user?._id }).sort({ createdAt: -1 })

    if (expenses.length === 0)
        throw new ApiError(404, "No transactions found.");

    return res.status(200).json(new ApiResponse(200, "Fetched All Transactions successfully.", { Transactions: expenses }))

})

module.exports = { addExpense, updateExpense, deleteExpense, getAllTransactions }