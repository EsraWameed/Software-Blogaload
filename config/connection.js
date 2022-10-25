const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
  {
    // host: 'localhost',
    dialect: 'postgres'
  }
);

module.exports = sequelize;