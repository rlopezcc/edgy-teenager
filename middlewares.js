var models = require('./models');
var config = require('./edgy.json');

module.exports = {

    checkPermission: function (permission) {
        return function (req, res, next) {
            models.User.findById(req.session.userId, function (err, user) {
                if (user && user.hasPerm(permission)) {
                    next();
                } else {
                    res.redirect('/');
                }
            });
        }
    },

    addConfig: function(req, res, next){
        res.locals.blogHeading = config.blogHeading;
        res.locals.blogSubHeading = config.blogSubHeading;
        next();
    }
};