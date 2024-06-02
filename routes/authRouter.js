const routes = require("express").Router();
const { login, logout } = require("../controllers/authController");

routes.post("/login", login);
routes.get("/logout", logout);

module.exports = routes;
