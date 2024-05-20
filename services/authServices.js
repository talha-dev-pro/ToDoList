const { hash } = require("bcryptjs");
const authModel = require("../models/authModel");
module.exports = {
  createUser: async (valService) => {
    try {
      console.log("in service", ({ userName, password } = valService));
      valService.password = await hash(valService.password, 10);
      console.log("after hash", ({ userName, password } = valService));
      const authModelResponse = authModel.authModel(valService);
      return authModelResponse.response;
    } catch (error) {
      return { message: error.message };
    }
  },
};
