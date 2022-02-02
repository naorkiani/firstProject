var express = require("express");
var router = express.Router();
//router
const meddleWareRouter = require("../middleware/authMeddleWare");
const registerRouter = require("./users/register");
const loginRouter = require("./users/login");
const findRouter = require("./users/find");
//use router
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/find", meddleWareRouter, findRouter);

module.exports = router;
