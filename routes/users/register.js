const express = require("express");
const router = express.Router();
const userValidation = require("../../validation/userValidation");
const bcrypt = require("../../config/bcrypt");
const userModel = require("../../module/userModule");
const { log } = require("debug");

router.post("/", async (req, res) => {
  try {
    const tryValid = await userValidation.registerSchema.validateAsync(
      req.body,
      { abortEarly: false }
    );

    tryValid.password = await bcrypt.createHash(tryValid.password);

    const emailArray = await userModel.findUserByEmail(tryValid.email);
    console.log(emailArray);
    if (emailArray.length != 0) {
      throw "this email is already";
    } else {
      await userModel.createUser(
        tryValid.userName,
        tryValid.email,
        tryValid.password
      );
    }
    res.json({ status: 200, msg: "ok", Response: tryValid });
  } catch (err) {
    res.status(400).json({ status: 400, err: err });
  }
});

module.exports = router;
