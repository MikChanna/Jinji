module.exports = function(sequelize, DataTypes) {
  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });

  Hobbies.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Hobbies.belongsToMany(models.Employee, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Hobbies;
};
