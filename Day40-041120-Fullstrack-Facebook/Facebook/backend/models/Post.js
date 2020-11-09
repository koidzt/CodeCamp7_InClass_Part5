module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    content: DataTypes.STRING,
    image: DataTypes.STRING(6000),
  }, {
    tableName: "posts",
    // timestamps: false
  });

  Post.associate = models => {
    Post.belongsTo(models.User, { foreignKey: "user_id" });
    Post.hasMany(models.Comment, { foreignKey: "post_id" });
  };

  return Post;
};