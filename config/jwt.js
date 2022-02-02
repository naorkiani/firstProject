const { date } = require("joi");
const jwt = require("jsonwebtoken");
const { token } = require("morgan");

const createToken = (date) => {
  return new Promise((res, rej) => {
    jwt.sign(
      date,
      "gu$fh)5gfh#^(s@fjj*dk$n(b",
      { expiresIn: "7d" },
      (err, token) => {
        if (err) {
          rej(err);
        } else {
          res(token);
        }
      }
    );
  });
};

const verifyToken = (token) => {
  return new Promise((res, rej) => {
    jwt.verify(token, "gu$fh)5gfh#^(s@fjj*dk$n(b", (err, decoded) => {
      if (err) {
        rej(err);
      } else {
        res(decoded);
      }
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
