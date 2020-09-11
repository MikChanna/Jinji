const models = require("../models");

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2],
      },
    },
    birthday: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
    hire_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    orientationComplete: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    compliance_trainingComplete: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      default: "",
    },
    food_preference: {
      type: DataTypes.STRING,
    },
    allergy: {
      type: DataTypes.STRING,
    },
  });

  Employee.associate = function(models) {
    Employee.belongsToMany(models.Allergies, {
      through: "employeeAllergies",
      as: "Allergies",
      foreignKey: "allergyId",
      otherKey: "employeeId",
    });
  };
  Employee.associate = function(models) {
    Employee.belongsToMany(models.Hobbies, {
      through: "employeeHobbies",
      as: "Hobbies",
      foreignKey: "hobbyId",
      otherKey: "employeeId",
    });
  };

  return Employee;
};
