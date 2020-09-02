module.exports = function(sequelize, DataTypes) {
  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });

  // Hobbies.associate = function(models) {
  //   Hobbies.belongsToMany(models.Employee, {
  //     foreignKey: {
  //       allowNull: false,
  //     },
  //   });
  // };

  return Hobbies;
};
