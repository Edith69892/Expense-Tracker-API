const  Router = require("express");
const { addExpense, updateExpense, deleteExpense, getAllTransactions } = require("../controllers/expense.conntroller.js");
const verifyJwt  = require("../middlewares/auth.middleware.js")

const router = Router();

router.route("/").post(verifyJwt,addExpense)
router.route("/:expenseId").patch(verifyJwt,updateExpense)
router.route("/:expenseId").delete(verifyJwt,deleteExpense)
router.route("/").get(verifyJwt,getAllTransactions)

module.exports = router