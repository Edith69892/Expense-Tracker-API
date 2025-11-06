const  Router = require("express");
const { addExpense, updateExpense } = require("../controllers/expense.conntroller.js");
const verifyJwt  = require("../middlewares/auth.middleware.js")

const router = Router();

router.route("/").post(verifyJwt,addExpense)
router.route("/expenseId").patch(verifyJwt,updateExpense)

module.exports = router