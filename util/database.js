const Sequelize = require("sequelize");

const sequelize = new Sequelize("node", "root", "emerson123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;