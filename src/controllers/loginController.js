const {body, validationResult, matchedData} = require("express-validator");
const db = require('../db/queries');
const passport = require('../config/passport');
const bcrypt = require('bcryptjs');
/* LOGIN */

async function renderLogin(req, res){
    res.render("login", { 
                title: "Happening Now",
                user: req.user,
            });
}

const validateLogin = [
    body("email").trim()
    .notEmpty().withMessage(`Must enter email.`)
    .isEmail().withMessage(`Must be valid email format.`),
    body("password").trim()
    .notEmpty().withMessage(`Must enter password.`)
];



const postLogin = [
    validateLogin,
    async (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).render("login", {
                title: "Happening Now",
                errors: errors.array()
            });
        }
        next();
    },
    passport.authenticate("local", {
            successRedirect: '/home',
            failureRedirect: '/'
    })
];

/* LOGOUT */

async function logout(req, res, next){
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        res.redirect('/');
    })
}
/* SIGNUP */

const validateSignUp = [
    body('name').trim()
    .notEmpty().withMessage(`Must enter name.`)
    .isAlpha().withMessage(`Must only contain letters.`),
    body("email").trim()
    .notEmpty().withMessage(`Must enter email.`)
    .isEmail().withMessage(`Must be valid email format.`),
    body("password").trim()
    .notEmpty().withMessage(`Must enter password.`)
    .isLength({min: 8, max: 20}).withMessage(`Must be between 8-20 characters.`)
    .matches(/[A-Z]/).withMessage("Must include uppercase character.")
    .matches(/[^A-Za-z0-9]/).withMessage("Must include special character.")
];

const postSignUp = [
    validateSignUp,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
                return res.status(400).render("login", {
                title: "Happening Now",
                errors: errors.array()
            });
        }
        try {
            const { name, email, password } = matchedData(req);
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.createUser(name, email, hashedPassword);
            res.redirect("/");
        } catch (err) {
            next(err);
        }

}];


module.exports = {
    renderLogin,
    postLogin,
    logout,
    postSignUp
};