module.exports = function(sequelize, DataTypes) {
  const Allergies = sequelize.define("Allergies", {
    allergy: {
      type: DataTypes.STRING,
    },
  });
  return Allergies;
};
