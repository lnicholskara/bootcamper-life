module.exports = function(sequelize, DataTypes) {
  //Sequelize - MySQL table setup
  var Comment = sequelize.define("Comment", {
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    votes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: { isInt: true }
    }
  });
  //Associate Post to Profile
  Comment.associate = function(models) {
    Comment.belongsTo(models.Profile, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //Associate Post to Profile
  Comment.associate = function(models) {
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
