const userModel = require("../models/userModel");

module.exports = {
  createUser: async (body) => {
    try {
      const isUser = await userModel.getUser(false, body.userName);
      if (isUser.error || isUser.response) {
        return { error: "user already exists" };
      }
      // body.password = await hash(body.password, 10); //applied this using hooks in the user table definitions
      // body.userId = uuid(); //applied this using hooks in the user table definitions
      const user = await userModel.createUser(body);
      if (user.error) {
        return {
          error: user.error,
        };
      }
      // delete user.response.dataValues.password; //applied this using hooks in the user table definitions
      return { response: user.response.dataValues };
    } catch (error) {
      return { message: error.message };
    }
  },
  getAllUser: async (query, userId, role) => {
    try {
      query.offset = (query.pageNo - 1) * query.limit;
      const users = await userModel.getAllUsers(query, userId, role);
      if (users.error) return { error: users.message };
      return { response: users.response };
    } catch (error) {
      return { message: error };
    }
  },
  deleteUser: async (userId) => {
    try {
      const deleteUser = await userModel.deleteUser(userId);
      if (deleteUser.error || !deleteUser.response) {
        return {
          error: {
            message: "unable to delete",
            error: deleteUser?.error || deleteUser.response,
          }, //optional chaining means short form of ternery operator
        };
      }
      return {
        response: { message: "user Deleted!", response: deleteUser.response },
      };
    } catch (error) {
      return { error: error };
    }
  },
  updateUser: async (body) => {
    try {
      const updateUser = await userModel.updateUser({ ...body });
      if (updateUser.error || !updateUser.response[0]) {
        return {
          error: {
            message: "unable to update",
            error: updateUser?.error || updateUser.response,
          }, //optional chaining means short form of ternery operator either this or either that
        };
      }
      return {
        response: { message: "user updated!", response: updateUser.response },
      };
    } catch (error) {
      return { error: error };
    }
  },
};
