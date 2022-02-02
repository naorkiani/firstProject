const joi = require("joi");

const loginSkeleton = {
  email: joi
    .string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
};

const registerSkeleton = {
  userName: joi.string().alphanum().min(2).max(30).required(),
  ...loginSkeleton,
  biz: joi.boolean(),
  //age: joi.number().min(10).max(80),
};

const loginSchema = joi.object(loginSkeleton);

const registerSchema = joi.object(registerSkeleton);

module.exports = {
  loginSchema,
  registerSchema,
};
