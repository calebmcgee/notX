const { Router } = require('express');
const { renderLogin, renderSignUp, postSignUp } = require('../controllers/loginController');
const { render } = require('ejs');
const loginRouter = Router();


loginRouter.get("/", renderLogin);

loginRouter.get("/login", renderLogin);

loginRouter.post("/login", renderLogin);

loginRouter.get("/signUp", renderSignUp);

loginRouter.post("/login/signUp", postSignUp);

//loginRouter.post("/login", getUsers);

module.exports = loginRouter;

