const checkAuth = async (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.currentUser = req.user;
        return next();
    }
    res.redirect('/');
}

module.exports = { checkAuth };