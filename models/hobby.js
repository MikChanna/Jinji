module.exports = function(sequelize, DataTypes) {
  const Hobbies = sequelize.define("Hobbies", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    hobby: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  });

  Hobbies.associate = function(models) {
    models.Hobbies.belongsToMany(models.Employee, {
      through: "employeeHobbies",
      as: "hobbyID",
    });
  };
  return Hobbies;
};
