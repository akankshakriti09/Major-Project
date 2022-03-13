const { Sequelize, DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const student = sequelize.define("student", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    regId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return student;
};
