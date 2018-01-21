module.exports = function(app, passport, request) {

    var credentials = require('../config/credentials').aws;

    // Google Login

    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback', 
        passport.authenticate('google', { 
            successRedirect : '/',
            failureRedirect : '/login'
        }));

    // Auth

    app.get('/login', function(req, res) {
        var path = require('path');
        res.sendFile(path.resolve('views/login.html'));
    })

    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });

    // Filre request handler

    app.get('/*', isLoggedIn, function(req, res) {
        const file = req.originalUrl + 'index.html'
        request(credentials.bucketUrl + file).pipe(res); 
    });
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/login');
}
