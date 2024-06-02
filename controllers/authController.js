const joi = require("joi");
const authService = require("../services/authServices");

const loginSchema = joi.object().keys({
  userName: joi.string().required(),
  password: joi.string().min(6).max(18).required(),
});

module.exports = {
  login: async (req, res) => {
    try {
      //await must be used for a promise function (validate)
      const validate = await loginSchema.validateAsync(req.body);
      const login = await authService.login(validate);
      if (login.error) {
        return res.send({
          error: login.error,
        });
      }
      res.cookie("auth", login.response.token);
      delete login.response.token;
      return res.send({
        response: login.response,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  logout: (req, res) => {
    return res.send({
      message: "User is logged out",
    });
  },
};
