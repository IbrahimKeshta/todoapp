const express = require("express");
const passport = require('passport');

module.exports = () => {
    const router = express.Router();

    router.get('/', async(req, res) => {
        res.render("login", {message: req.flash("loginMessage")})
    })

    router.post("/login", passport.authenticate("local-login", {
        successRedirect: "/todos",
        failureRedirect: "/",
        failureFlash: true
    }))

    return router;
}