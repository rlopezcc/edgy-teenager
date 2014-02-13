var models = require('./models');
var ObjectId = require('mongoose').Types.ObjectId;

exports.login = function (req, res) {
    models.User.findOne({email: req.body.email}, function (err, user) {
        if (user && user.checkPassword(req.body.password)) {
            req.session.userId = user._id;
            res.json({status: 'OK'}, 200);
        }else{
            res.json({loginError: 'Wrong email or password.'});
        }
    });
};

exports.setUserPermissions = function (req, res){
    var id = req.params.id;
    models.User.findById(id, function (err, data){
        if (data){
            models.User.update(
                { _id: id },
                { $set: { permissions: req.body.permissions } },
                { upsert: true }
             ,function (err, data) {
                if (err){
                    return res.json({status: 'ERROR'});
                }
                res.json({status: 'OK'});
            });
        }
    });
};

exports.deleteUser = function (req, res) {
    var userId = new ObjectId(req.params.id);
    models.User.collection.remove({ _id: userId }, function (err, data){
        if (err){
            res.json({status: 'ERROR'});
        }else{
            res.json({status: 'OK'});
        }
    });
}