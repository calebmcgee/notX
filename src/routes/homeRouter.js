const { Router } = require('express');
const { renderHome } = require('../controllers/homeController');
const { checkAuth } = require('../middleware/checkAuth');  

const homeRouter = Router();

homeRouter.use(checkAuth);

homeRouter.get('/', renderHome);

module.exports = homeRouter;