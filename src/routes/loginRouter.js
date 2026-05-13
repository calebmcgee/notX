const { Router } = require('express');
const { renderLogin } = require('../controllers/loginController');
const loginRouter = Router();

loginRouter.get("/", renderLogin);

//loginRouter.post("/login", getUsers);

module.exports = loginRouter;

