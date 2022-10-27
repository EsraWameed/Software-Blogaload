//dev dependencies, sequelize for db, and dotenv for sensitive info protection
const Sequelize = require('sequelize');
require('dotenv').config();

let sequelize;
//this statement establishes connection to jawsdb adon 
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
    }
  );
}
//exporting module
module.exports = sequelize;