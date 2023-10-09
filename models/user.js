const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const emailRegexp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"]
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: emailRegexp
    },
    token: {
      type: String,
      default: null
    },
    avatarURL: {
      type: String,
      required: true
    },
    verify: {
      type: Boolean,
      default: false
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"]
    }
  },
  { versionKey: false }
);

userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().required()
});

const loginSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
  password: Joi.string().required()
});

const userEmailSchema = Joi.object({
  email: Joi.string().trim().pattern(emailRegexp).required(),
})

const User = model("user", userSchema);

const schemas = {
  registerSchema,
  loginSchema,
  userEmailSchema
};

module.exports = {
  User,
  schemas
};