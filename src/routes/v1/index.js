const express = require('express')
const router = express.Router()
const passport = require('passport');
const { tweetController, likeController, registerController, loginController, commentController, followController } = require('../../controllers/index')
const { authentication } = require('../../middlewares/passport-middleware')
const { upload } = require('../../configs/aws-config')
const verifyJwt = require('../../middlewares/login-middleware')

router.post('/register', registerController.register)
router.post('/login', loginController.signIn)
// router.use(verifyJwt)
router.post('/tweet', authentication, tweetController.createTweet)
// router.post('/tweet', authentication, upload.single('avatar'), tweetController.createTweet)
router.post('/togglelike', authentication, likeController.toggleLike)
router.post('/comment', authentication, commentController.createComment)
router.post('/follow/:userId', authentication, followController.follow);
// router.post('/upload',,)

module.exports = router 
