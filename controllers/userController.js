const joi = require("joi");

const createUserSchema = joi.object().keys({
  userName: joi.string().email().required(),
  // password: joi.string().min(6).max(18).required,
});

const userArray = [];

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
      // const validate = await createUserSchema.validateAsync(req.query);
      userArray.push(validate);
      console.log(userArray);

      return res.send({
        message: "Created User",
        data: validate,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
  getUser: (req, res) => {
    res.send({
      message: "Create User",
    });
  },
};
