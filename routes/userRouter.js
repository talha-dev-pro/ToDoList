const route = require("express").Router();
const { getUser, createUser } = require("../controllers/userController");

route.get("/getUser", getUser);
route.post("/createUser", createUser);

module.exports = route;
