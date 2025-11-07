const  Router = require("express");
const verifyJwt  = require("../middlewares/auth.middleware.js");
const { dashboard } = require("../controllers/dashboard.conntroller.js");

const router = Router();

router.route("/").get(verifyJwt,dashboard);

module.exports = router