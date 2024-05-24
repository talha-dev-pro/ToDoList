const route = require("express").Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

route.get("/getAllUsers", getAllUsers);
route.post("/createUser", createUser);
route.delete("/deleteUser", deleteUser);
route.put("/updateUser", updateUser);

module.exports = route;
