const db = require('../models');

const getAllPostsWithoutAuth = async (req, res) => {
  const allPostsInDb = await db.Post.findAll({
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      {
        model: db.User,
        attributes: ["id", "name", "profile_url"]
      }
    ],
    attributes: ["id", "content", "image", "createdAt", "updatedAt"],
  })
  res.send(allPostsInDb);
};

const getAllMyPosts = async (req, res) => {
  const allMyPosts = await db.Post.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      {
        model: db.User,
        attributes: ["id", "name", "profile_url"]
      }
    ],
    attributes: ["id", "content", "image", "createdAt", "updatedAt"],
  });
  res.status(200).send(allMyPosts);
};

const getMyFeed = async (req, res) => {
  const friendByIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_to_id: req.user.id }
  })).map(e => e.request_by_id);

  const friendToIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_by_id: req.user.id }
  })).map(e => e.request_to_id);

  const allFriendIds = [...friendByIds, ...friendToIds, req.user.id];

  const allFeeds = await db.Post.findAll({
    where: { user_id: allFriendIds },
    order: [
      ['id', 'ASC'],//ASC และ DESC คือรูปแบบการเรียงลำดับ ASC เรียงจากน้อยไปหามาก DESC เรียงจากมากไปหาน้อย ดังนั้นในที่นี้คือเรียนลำดับ id จากมากไปน้อย
    ],
  });

  res.send(allFeeds);
};

const createPost = async (req, res) => {
  const { content, image } = req.body;
  if (content || image) {
    const newPost = await db.Post.create({ content, image, user_id: req.user.id });
    res.status(204).send(newPost);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  const targetPost = await db.Post.findOne({ where: { id: postId } });
  if (targetPost.user_id === req.user.id) {
    await targetPost.destroy();
    res.status(204).send();
  }
};

const editPost = (req, res) => {

};


module.exports = {
  getAllPostsWithoutAuth,
  getAllMyPosts,
  getMyFeed,
  createPost,
  deletePost,
  editPost
};