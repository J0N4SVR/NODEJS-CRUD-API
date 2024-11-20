const { Sequelize } = require("sequelize");
const relationModel = require("../models/relation.model");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MY_DB,
  process.env.MY_USER,
  process.env.MY_PASSWORD,
  {
    host: process.env.MY_HOST,
    port: process.env.MY_SQL_PORT,
    dialect: process.env.MY_DIALECT,
    dialectOptions: {
      options: { encrypt: false },
    },
  }
);

const db = {};
db.Relation = relationModel(sequelize);
// sync all models with database
sequelize.sync({ alter: true });

module.exports = db;