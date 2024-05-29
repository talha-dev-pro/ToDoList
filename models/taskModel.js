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
          exclude: ["deletedAt", "userId"],
        },
        include: {
          model: models.users,
          attributes: ["userId", "userName"],
        },
      });
      return { response: task };
    } catch (error) {
      return { message: error.message };
    }
  },
  deleteTask: async (taskId) => {
    try {
      const deleteTask = await models.tasks.destroy({
        where: { taskId: taskId },
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
  getTask: async (taskId) => {
    try {
      const getTask = await models.tasks.findOne({ where: { taskId: taskId } });
      return {
        response: getTask,
      };
    } catch (error) {
      return { error: error.message };
    }
  },
};
