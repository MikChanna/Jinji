module.exports = function(sequelize, DataTypes) {
  const Hobbies = sequelize.define("Hobbies", {
    hobby: {
      type: DataTypes.STRING,
    },
  });
  return Hobbies;
};
