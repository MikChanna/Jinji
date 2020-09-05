const models = require("../models");

module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define(
    "Employee",
    {
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
      allergyID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
      },
      hobbyID: {
        type: DataTypes.INTEGER,
        allowNull: true,
        foreignKey: true,
      },
      hire_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },

      orientationComplete: {
        type: DataTypes.DATEONLY,
      },
      compliance_trainingComplete: {
        type: DataTypes.DATEONLY,
      },
    }
    // {
    //   include: [
    //     {
    //       association: models.Hobbies,
    //       as: "hobbies",
    //     },
    //     {
    //       association: models.Allergies,
    //       as: "allergies",
    //     },
    //   ],
    // }
  );

  // Employee.associate = function(models) {
  //   Employee.belongsToMany(models.Allergies, {
  //     through: "employeeAllergies",
  //   });
  // };
  // Employee.associate = function(models) {
  //   Employee.belongsToMany(models.Hobbies, {
  //     through: "employeeHobbies",
  //   });
  // };

  return Employee;
};
