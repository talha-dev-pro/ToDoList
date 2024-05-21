require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  port: process.env.DB_PORT,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch((error) => {
    console.log("Unable to Connect", error.message);
  });

module.exports = sequelize;
