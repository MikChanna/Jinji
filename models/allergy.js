module.exports = function(sequelize, DataTypes) {
  const Allergies = sequelize.define("Allergies", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    allergy: {
      type: DataTypes.STRING,
    },
    createdAt: {
      type: DataTypes.DATEONLY,
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
    },
  });
  Allergies.associate = function(models) {
    models.Allergies.belongsToMany(models.Employee, {
      through: "employeeAllergies",
    });
  };
  return Allergies;
};
