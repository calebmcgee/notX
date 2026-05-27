async function renderHome(req, res) {
    res.render('home', {
        title: 'home',
        user: req.user
    });
}


module.exports = {
    renderHome
};