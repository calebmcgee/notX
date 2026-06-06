const { Router } = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const { renderProfile } = require('../controllers/profileController');


const profileRouter = Router();
profileRouter.use(checkAuth);

profileRouter.get('/', renderProfile);

module.exports = profileRouter;