require("dotenv").config();
const { compare } = require("bcryptjs");
const userModel = require("../models/userModel");
const { sign } = require("jsonwebtoken");

module.exports = {
  login: async (body) => {
    try {
      const getUser = await userModel.getUser(false, body.userName);
      if (getUser.error || !getUser.response) {
        return {
          error: {
            message: "user not found",
            error: getUser?.error || getUser.response,
          },
        };
      }
      const isValid = await compare(
        body.password,
        getUser.response.dataValues.password
      );
      if (!isValid) {
        return {
          response: {
            message: "invalid credentials",
            response: isValid,
            token: undefined,
          },
        };
      }
      delete getUser.response.dataValues.password;
      const token = sign(getUser.response.dataValues, process.env.SECRET);
      return {
        response: {
          message: "Logged in successfuly",
          response: isValid,
          token: token,
        },
      };
    } catch (error) {
      return { message: error.message };
    }
  },
};
