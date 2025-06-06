import express from 'express';
import { registerUser } from '../controllers/authController.js';
import { validateRegister } from '../middlewares/validateRegister.js';
import { loginUser } from '../controllers/authLoginController.js';
import { validateLogin } from '../middlewares/validateLogin.js';
import { protect } from '../middlewares/authMiddleware.js';


const router = express.Router();

router.post('/register', validateRegister, registerUser);
router.post('/login', validateLogin, loginUser);
router.get('/currentUser', protect, (req, res) => {
    res.json({user: req.user})
})

export default router;
