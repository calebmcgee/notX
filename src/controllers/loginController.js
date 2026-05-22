const {body, validationResult, matchedData} = require("express-validator");
const db = require('../db/queries');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

async function renderLogin(req, res){
    res.render("login", { 
                title: "Login",
                //users: await db.getUsers(),
            });
}

async function renderSignUp(req, res){
    res.render("signUp", { 
                title: "Sign Up",
                //users: await db.getUsers(),
            });
}

const validateUser = [
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
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()){
                return res.status(400).render("signUp", {
                title: "Sign Up",
                //users: await db.getUsers(),
                errors: errors.array()
            });
        }
        const { name, email, password } = matchedData(req);
        console.log(`name: ${name}, email: ${email}, password: ${password}`);
        await db.createUser(name, email, password);
        res.redirect("/login");
}];
/*
passport.use(
    new LocalStrategy(async (email, password, done) => {
        try {
            const { rows } = await db.getUser(email);
        } catch(error) {
            return next(error);
        }
    })
)
*/
module.exports = {
    renderLogin,
    renderSignUp,
    postSignUp
};