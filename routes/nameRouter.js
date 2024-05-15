const route =require("express").Router();
const {getUser,createUser}=require("../controllers/nameController");

route.get("/getUser",getUser);
route.get("/createUser",createUser);

module.exports= route