const db = require('../models');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { username, password, name, profile_pic } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });
  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = await db.User.create({ username, name, profile_pic, password: hashedPassword });
    res.status(201).send(newUser);
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });
  if (!targetUser) {
    res.status(400).send({ message: "username or password is wrong." });
  } else {
    const isCorrect = await bcryptjs.compareSync(password, targetUser.password);

    if (!isCorrect) {
      res.status(400).send({ message: "username or password is wrong." });
    } else {
      const payload = { id: targetUser.id, createdAt: new Date()};
      const token = jwt.sign(payload, process.env.SECRET, { expiresIn: 3600 });

      res.status(200).send({ token })
    }
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;
  const isCorrect = await bcryptjs.compareSync(oldPassword, req.user.password);
  if (!isCorrect) {
    res.status(400).send({ message: "Wrong password." })
  } else {
    if (newPassword !== confirmPassword) {
      res.status(400).send({ message: "Password not match." })
    } else {
      const salt = bcryptjs.genSaltSync(Number(process.env.SALT_ROUND));
      const hashedPassword = bcryptjs.hashSync(newPassword, salt);
      await req.user.update({ password: hashedPassword });
      res.status(200).send({ message: "Password has been changed" })
    }
  }
};

module.exports = {
  register,
  login,
  changePassword
}