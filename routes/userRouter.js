const route = require("express").Router();
const { getAllUsers, createUser } = require("../controllers/userController");

route.get("/getAllUsers", getAllUsers);
route.post("/createUser", createUser);
// route.put("/updateUser", updateUser);

module.exports = route;
