const { response } = require("express");
const taskModel = require("../models/taskModel");
const { v4: uuid } = require("uuid");

module.exports = {
  createTask: async (body) => {
    try {
      //try catch is used so that the server should not crash!
      console.log(body);
      body.taskId = uuid();
      console.log(body);
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
      const deleteTask = await taskModel.deleteTask(body.taskName);
      if (deleteTask.error) {
        return { error: { message: "cannot delete", error: deleteTask.error } };
      }
      return { response: { message: "task Deleted", response: deleteTask } };
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
      return {
        response: updateTask,
      };
    } catch (error) {
      return { message: error.message };
    }
  },
};
