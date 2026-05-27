const { Router } = require('express');
const { renderLogin, postLogin, logout, postSignUp } = require('../controllers/loginController');
const loginRouter = Router();
const { checkAuth } = require('../middleware/checkAuth'); 

loginRouter.get("/", renderLogin);

loginRouter.post("/login", postLogin);

loginRouter.post("/logout", logout);

loginRouter.post("/signUp", postSignUp);


module.exports = loginRouter;

