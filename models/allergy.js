module.exports = function(sequelize, DataTypes) {
  const Allergies = sequelize.define("Allergies", {
    allergy: {
      type: DataTypes.STRING,
    },
  });

  Allergies.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Allergies.belongsToMany(models.Employee, {
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Allergies;
};
