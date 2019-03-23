module.exports = function(sequelize, DataTypes) {
  var Profile = sequelize.define("Profile", {
    //New Profile Setup
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 70]
      }
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 70]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true }
    },
    school: { type: DataTypes.STRING, allowNull: false },
    graduated_yet: { type: DataTypes.BOOLEAN, allowNull: false },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 70]
      }
    },
    state: { type: DataTypes.STRING, allowNull: false, validate: { len: [2] } },
    github: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isUrl: true }
    },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  //Count Number of Posts
  Profile.associate = function(models) {
    Profile.hasMany(models.Post, {});
  };
  //Count Number of Comments
  Profile.associate = function(models) {
    Profile.hasMany(models.Comment, {});
  };
  return Profile;
};
