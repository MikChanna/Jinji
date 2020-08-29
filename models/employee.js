module.exports = function (sequelize, DataTypes) {
  var Employee = sequelize.define("Employee", {
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5],
      },
    },
    postion: {
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
    technical_skills: {
      type: DataTypes.STRING,
    },
    orientation: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    compliance_training: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
};
