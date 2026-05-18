const { Router } = require('express');
const { renderLogin, renderSignUp, postSignUp } = require('../controllers/loginController');
const loginRouter = Router();

loginRouter.get("/login", renderLogin);

loginRouter.get("/signUp", renderSignUp);

loginRouter.post("/signUp", postSignUp);

//loginRouter.post("/login", getUsers);

module.exports = loginRouter;

