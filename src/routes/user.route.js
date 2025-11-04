const  Router = require("express");
const { register, logOut } = require("../controllers/user.controller.js");
const { login }  = require("../controllers/user.controller.js");

const router = Router();

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logOut").post(logOut)


module.exports = router