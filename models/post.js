module.exports = function(sequelize, DataTypes) {
  //Sequelize - MySQL table setup
  var Post = sequelize.define(
    "Post",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 100]
        }
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 40]
        }
      },
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
    },
    {
      freezeTableName: true
    }
  );
  //Associate Post to Profile
  Post.associate = function(models) {
    Post.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  //Count Number of Comments Per Post
  Post.associate = function(models) {
    Post.hasMany(models.Comment, {});
  };
  return Post;
};
