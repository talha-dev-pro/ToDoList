const taskModel = require("../models/taskModel");
const { v4, uuid } = require("uuid");

module.exports = {
  createTask: async (body) => {
    try {
      //try catch is used so that the server should not crash!
      body.taskId = uuid();
      const task = await taskModel.createTask(body);
      if (task.error) {
        return {
          error: {
            message: "Cannot Create Task",
            error: task.error,
          },
        };
      }
      return {
        message: "Task Created",
        response: task.response,
      };
    } catch (error) {
      return { message: error.message };
    }
  },
};
