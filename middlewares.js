var models = require('./models');

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
    }
};