const express = require('express');
const authController = require('../controllers/authController');
const authMiddlewares = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.get('/protected', authMiddlewares,(req,res)=>{
    res.status(200).send(`Hola usuario ${req.userId}`);
});

module.exports = router;