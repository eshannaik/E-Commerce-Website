import {Router} from 'express';
const authController = require('../controllers/authControllers');

const router = Router();
const auth = require('../middleware/auth');

router.post('/resgister',authController.signup);
router.post('/login',authController.login);
router.post('/user',auth ,authController.get_user);

module.exports = router;