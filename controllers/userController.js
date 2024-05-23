const joi = require("joi");
const userService = require("../services/userService");

const createUserSchema = joi.object().keys({
  userName: joi.string().alphanum().min(3).max(34).required(),
  // email: joi.string().email().required(),
  password: joi.string().min(6).max(18).required(),
  confirmPassword: joi.ref("password"),
});

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      const user = await userService.createUser(validate);
      if (user.error) {
        return res.send({
          error: "user already exists",
        });
      }
      return res.send({
        response: user.response,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    try {
      const validate = await getUserSchema.validateAsync(req.query);
      return res.send({
        message: "Got User",
        data: user1,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUser();
      return res.send({
        response: users.response,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
