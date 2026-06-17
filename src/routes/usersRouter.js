const { Router } = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const { renderUsers } = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use(checkAuth);

usersRouter.get('/', renderUsers);

module.exports = usersRouter;