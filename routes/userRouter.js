const route = require("express").Router();
const {
  getUser,
  createUser,
  updateUser,
} = require("../controllers/userController");

route.get("/getUser", getUser);
route.post("/createUser", createUser);
route.put("/updateUser", updateUser);

module.exports = route;
