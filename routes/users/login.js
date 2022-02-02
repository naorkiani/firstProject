const express = require("express");
const router = express.Router();
const userValidation = require("../../validation/userValidation");
const userModel = require("../../module/userModule");
const bcrypt = require("../../config/bcrypt");
const jwt = require("../../config/jwt");
const { token } = require("morgan");
const { hash } = require("bcryptjs");

router.post("/", async (req, res) => {
  try {
    const value = await userValidation.loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const userArr = await userModel.findUserByEmail(value.email);
    if (userArr.length != 0) {
      const isPassOk = await bcrypt.compareHash(
        value.password,
        userArr[0].password
      );
      if (isPassOk === true) {
        res.json({
          status: 200,
          msg: `all is ok welcome ${userArr[0].userName}`,
          token: token,
        });
        const token = await jwt.createToken({
          id: userArr[0].id,
          email: userArr[0].email,
        });
      } else {
        throw "err you have false in password";
      }
    } else {
      throw "is not found email";
    }
    res.json({ status: 200, msg: "ok", Response: value });
  } catch (err) {
    res.json({ err });
  }
});

module.exports = router;
