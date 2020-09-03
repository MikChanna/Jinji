module.exports = function(sequelize, DataTypes) {
  const Allergies = sequelize.define("Allergies", {
    allergy: {
      type: DataTypes.STRING,
    },
  });
  Allergies.associate = function(models) {
    models.Allergies.belongsToMany(models.Employee, {
      through: "allergyAssociation",
    });
  };
  return Allergies;
};
