const joi = require("joi");

const createUserSchema = joi.object().keys({
  userName: joi.string().email().required(),
  password: joi.string().min(6).max(18).required(),
});
const getUserSchema = joi.object().keys({
  userName: joi.string().email().required(),
});

const updatePasswordSchema = joi.object().keys({
  userName: joi.string().email().required(),
  password: joi.string().min(6).max(18).required(),
});

const userArray = [];

module.exports = {
  createUser: async (req, res) => {
    try {
      const validate = await createUserSchema.validateAsync(req.body);
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
  getUser: async (req, res) => {
    try {
      const validate = await getUserSchema.validateAsync(req.query);
      let getUser = (item) => {
        if (item.userName === validate.userName) {
          return item;
        } else {
          return "User not found";
        }
      };
      let user1 = userArray.map(getUser);
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
  updateUser: async (req, res) => {
    try {
      const validate = await updatePasswordSchema.validateAsync(req.body);
      let getUser = (item) => {
        if (item.userName === validate.userName) {
          return item;
        } else {
          return "User not found";
        }
      };
      let user1 = userArray.map(getUser);
      // const { user } = user1[0];
      console.log(user1);
      let olduser = user1[0];
      // user1[0].password = validate.password;
      return res.send({
        old: olduser,
        message: "Password changed",
        data: user1,
      });
    } catch (error) {
      return res.send({
        message: error.message,
      });
    }
  },
};
