const route = require("express").Router();
const { getAdmin, createAdmin } = require("../controllers/adminController");

route.get("/admin", getAdmin);
route.get("/createAdmin", createAdmin);

module.exports = route;
