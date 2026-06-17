const db = require('../db/queries');

function renderProfile(req, res){
    res.render('profile', { 
        title: 'profile',
        user : req.user 
    });
}   

module.exports = {
    renderProfile
}