const route = require("express").Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");
const { middleware } = require("../middleware");

route.get("/getAllUsers", middleware, getAllUsers);
route.post("/createUser", createUser);
route.delete("/deleteUser", deleteUser);
route.put("/updateUser", updateUser);

module.exports = route;
