const joi = require("joi");
const authService = require("../services/authServices");

const loginSchema = joi.object().keys({
  userName: joi.string().email().required(),
  password: joi.string().min(6).max(18).required(),
});

module.exports = {
  login: async (req, res) => {
    try {
      //const validate = await loginSchema.validateAsync(req.query); //await must be used for validate(which is promise) and is used in async function
      const validate = await loginSchema.validateAsync(req.body);
      console.log("in controller", ({ userName, password } = validate));
      const valService = await authService.createUser(validate);
      console.log(
        "after service and model updates",
        ({ userName, password } = valService)
      );
      return res.send({
        message: "User is logged in",
        data: valService,
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
