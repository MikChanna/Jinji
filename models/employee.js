module.exports = function(sequelize, DataTypes) {
  const Employee = sequelize.define("Employee", {
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
    },
    compliance_trainingComplete: {
      type: DataTypes.DATEONLY,
    },
  });

  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });

  const Allergies = sequelize.define("Allergies", {
    allergy: {
      type: DataTypes.STRING,
    },
  });

  const Position = sequelize.define("Position", {
    position: {
      type: DataTypes.STRING,
    },
  });

  const Skills = sequelize.define("Skills", {
    skill: {
      type: DataTypes.STRING,
    },
  });
};
