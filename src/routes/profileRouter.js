const { Router } = require('express');
const { checkAuth } = require('../middleware/checkAuth');
const { renderProfile, createPost } = require('../controllers/profileController');


const profileRouter = Router();
profileRouter.use(checkAuth);

profileRouter.get('/', renderProfile);

profileRouter.post('/create', createPost);

module.exports = profileRouter;