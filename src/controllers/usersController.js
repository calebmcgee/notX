async function renderUsers(req, res) {
    res.render('users', {
        title: 'Users',
        user: req.user
    })
}

module.exports = {
    renderUsers
}