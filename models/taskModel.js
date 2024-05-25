const { where } = require("sequelize");
const { models } = require("./index");

module.exports = {
  createTask: async (body) => {
    try {
      const task = await models.tasks.create({ ...body });
      return { response: task };
    } catch (error) {
      return { message: error.message };
    }
  },
  getAllTasks: async () => {
    try {
      const task = await models.tasks.findAll({
        attributes: {
          exclude: ["deletedAt"],
        },
      });
      return { response: task };
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteTask: async (taskName) => {
    try {
      const deleteTask = await models.tasks.destroy({
        where: { taskName: taskName },
      });
      return { message: "Task Deleted", response: deleteTask };
    } catch (error) {
      return { message: error.message };
    }
  },
  updateTask: async ({ taskId, ...body }) => {
    try {
      const updateTask = await models.tasks.update(
        { ...body },
        { where: { taskId: taskId } }
      );
      return { response: updateTask };
    } catch (error) {
      return { message: error.message };
    }
  },
};
