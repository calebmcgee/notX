const db = require('../db/queries');


async function renderHome(req, res) {
    res.render('home', {
        title: 'home',
        user: req.user,
        posts: db.getAllPosts()
    });
}


module.exports = {
    renderHome
};