const  Router = require("express");
const { addExpense } = require("../controllers/expense.conntroller.js");

const router = Router();

router.route("/").post(addExpense)

module.exports = router