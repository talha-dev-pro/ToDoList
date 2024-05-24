const taskService = require("../services/taskService");
const joi = require("joi");

const createTaskSchema = joi.object().keys({
  taskName: joi.string().alphanum().min(3).max(30).required(),
  taskInfo: joi.string().alphanum().min(0).max(1000),
});

module.exports = {
  createTask: async (req, res) => {
    try {
      console.log(req.body);
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
};
