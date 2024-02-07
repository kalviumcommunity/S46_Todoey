const joi = require("joi");

const userValidator = (schema) => (data) =>
  schema.validate(data, { abortEarly: false });

const schema = joi.object({
  email: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"))
    .required(),
  password: joi.string().min(3).max(20).required(),
});

exports.userValidator = userValidator(schema);
