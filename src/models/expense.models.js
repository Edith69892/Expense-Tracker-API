const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    title : String,
    amount : Number,
    type : String,
    category : String,
    date : Date,
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true});

const Expense = mongoose.model("Expense", expenseSchema);

module.exports = {Expense}