module.exports = function(sequelize, DataTypes) {
  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });

  Hobbies.associate = function(models) {
    models.Hobbies.belongsToMany(models.Employee, {
      through: "allergyAssociation",
    });
  };
  return Hobbies;
};
