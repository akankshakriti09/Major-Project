const Sequelize = require("sequelize");
const config = require("../config/db.config.js");

const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  port: config.port,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});
const db = {};
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log("Unable to connect", err);
  });

db.student = require("./student.model")(sequelize, Sequelize);
db.teacher = require("./teacher.model")(sequelize, Sequelize);

module.exports = db;
