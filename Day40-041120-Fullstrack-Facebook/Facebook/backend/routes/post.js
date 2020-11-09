const router = require('express').Router();
const postController = require('../controllers/post');
const passport = require('passport');

const auth = passport.authenticate("jew", { session: false });

router.get('/all-post', postController.getAllPostsWithoutAuth);
router.get('/', auth, postController.getAllMyPosts);
router.get('/feed', postController.getMyFeed);
router.post('/', auth, postController.createPost);
router.delete('/:id', auth, postController.deletePost);
router.put('/:id', auth, postController.editPost);

module.exports = router;