module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_pic: {
      type: DataTypes.STRING(6000),
      allowNull: false,
    }
  }, {
    tableName: "users",
    // timestamps: false
  });

  User.associate = models => {
    User.hasMany(models.Post, { foreignKey: "user_id" });
    User.hasMany(models.Comment, { foreignKey: "user_id" });
    User.hasMany(models.Friend, { foreignKey: "request_to_id" });
    User.hasMany(models.Friend, { foreignKey: "request_by_id" });
  }

  return User;
};