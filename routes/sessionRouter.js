const route = require("express").Router();
const {
  createSession,
  deleteSession,
  getSession,
} = require("../controllers/sessionController");

route.post("/session", createSession);
route.delete("/delSession", deleteSession);
route.get("/getSession", getSession);

module.exports = route;
