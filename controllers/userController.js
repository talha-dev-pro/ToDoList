const joi = require("joi");
const userService = require("../services/userService");

const createUserSchema = joi.object().keys({
  userName: joi.string().alphanum().min(3).max(34).required(),
  password: joi.string().min(6).max(18).required(),
  confirmPassword: joi.ref("password"),
});
const updateUserSchema = joi.object().keys({
  userId: joi.string().required(),
  userName: joi.string().alphanum().min(3).max(34),
});
const deleteUserSchema = joi.object().keys({
  userId: joi.array().single().required(),
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
  deleteUser: async (req, res) => {
    try {
      const validate = await deleteUserSchema.validateAsync(req.query);
      const deleteUser = await userService.deleteUser(validate.userId);
      if (deleteUser.error) {
        return res.send({
          error: deleteUser.error,
        });
      }
      return res.send({
        response: deleteUser.response,
      });
    } catch (error) {
      return { error: error.message };
    }
  },
  updateUser: async (req, res) => {
    try {
      const validate = await updateUserSchema.validateAsync(req.body);
      const updateUser = await userService.updateUser(validate);
      if (updateUser.error) {
        return res.send({
          error: updateUser.error,
        });
      }
      return res.send({
        response: updateUser.response,
      });
    } catch (error) {
      return { error: error };
    }
  },
};
