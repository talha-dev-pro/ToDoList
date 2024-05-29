const taskService = require("../services/taskService");
const joi = require("joi");

const createTaskSchema = joi.object().keys({
  taskName: joi.string().min(3).max(30).required(),
  userId: joi.string().required(),
  taskInfo: joi.string().min(0).max(1000),
});
const deleteTaskSchema = joi.object().keys({
  taskId: joi.string().required(),
});
const updateTaskSchema = joi.object().keys({
  taskId: joi.string().required(),
  taskName: joi.string().min(3).max(30),
  taskInfo: joi.string().min(0).max(1000),
});

module.exports = {
  createTask: async (req, res) => {
    try {
      const validate = await createTaskSchema.validateAsync(req.body);
      const task = await taskService.createTask(validate);
      if (task.error) {
        return res.send({
          error: {
            message: "unable to create a task",
            error: task.error,
          },
        });
      }
      return res.send({ response: task.response });
    } catch (error) {
      return res.send({ message: error.message });
    }
  },
  getAllTasks: async (req, res) => {
    try {
      //try catch is used so that the server should not crash!
      const task = await taskService.getAllTasks();
      if (task.error) {
        return res.send({
          error: {
            message: "Cannot get Tasks",
            error: task.error,
          },
        });
      }
      return res.send({
        message: "All Tasks",
        response: task.response,
      });
    } catch (error) {
      return res.send({ message: error.message });
    }
  },
  deleteTask: async (req, res) => {
    try {
      //try catch is used so that the server should not crash!
      const validate = await deleteTaskSchema.validateAsync(req.query);
      const deleteTask = await taskService.deleteTask(validate);
      if (deleteTask.error) {
        return res.send(deleteTask.error);
      }
      return res.send({
        response: deleteTask.response,
      });
    } catch (error) {
      return res.send({ message: error.message });
    }
  },
  updateTask: async (req, res) => {
    try {
      const validate = await updateTaskSchema.validateAsync(req.body);
      const updateTask = await taskService.updateTask(validate);
      if (updateTask.error) {
        return res.send(updateTask.error);
      }
      return res.send(updateTask);
    } catch (error) {
      return res.send({ message: error.message });
    }
  },
};
