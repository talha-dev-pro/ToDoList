const route = require("express").Router();
const { createTask } = require("../controllers/taskController");

route.post("/createTask", createTask);

module.exports = route;
