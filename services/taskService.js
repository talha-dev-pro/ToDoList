const taskModel = require("../models/taskModel");

module.exports = {
  createTask: async (body) => {
    try {
      //try catch is used so that the server should not crash!
      //body.taskId = uuid(); //applied this using hooks in the user table definitions
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
  getAllTasks: async () => {
    try {
      //try catch is used so that the server should not crash!
      const task = await taskModel.getAllTasks();
      if (task.error) {
        return {
          error: {
            message: "Cannot get Tasks",
            error: task.error,
          },
        };
      }
      return {
        message: "All Tasks",
        response: task.response,
      };
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteTask: async (body) => {
    try {
      const deleteTask = await taskModel.deleteTask(body.taskId);
      if (deleteTask.error || !deleteTask.response) {
        return {
          error: {
            message: "Cannot delete Task",
            error: deleteTask?.error || deleteTask.response,
          },
        };
      }
      return { response: deleteTask };
    } catch (error) {
      return { message: error.message };
    }
  },
  updateTask: async (body) => {
    try {
      const updateTask = await taskModel.updateTask({ ...body });
      if (updateTask.error) {
        return {
          error: {
            message: "cannot update task",
            error: updateTask.error,
          },
        };
      }
      const getTask = await taskModel.getTask(body.taskId);
      return {
        response: {
          message: "Task updated",
          updated: updateTask.response,
          updatedTask: getTask.response,
        },
      };
    } catch (error) {
      return { message: error.message };
    }
  },
};
