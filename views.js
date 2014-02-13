var ObjectId = require('mongoose').Types.ObjectId;
var models = require('./models');
var stringUtils = require('./utils/string');
var imageMimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

exports.loginTemplate = function (req, res) {
    res.render('login.html');
};

exports.index = function (req, res) {
    models.Post.find({}, function(err, psts){
        if (err){
            console.log(err);
        }else{
            res.render('index.html', {posts: psts ? psts : ['Still no posts.']});
        }
    });
};

exports.newPostTemplate = function (req, res) {
    res.render('post-new.html', {});
};

exports.newPost = function (req, res) {
    picture = req.files.picture;
    if (imageMimetypes.indexOf(picture.type) != -1) {
        models.Post.collection.insert({
                title: req.body.title, 
                body: req.body.body, 
                picture: picture.path.replace('static', '')
            }, function() {
                res.redirect('/');
        }); 
    }
};

exports.detailPost = function (req, res) {
    var pst = models.Post.findById(req.params.id, function (err, pst) {
        if (!pst){
            return res.redirect('/404');
        }
        res.render('post-detail.html', {post: pst});
    });
};

exports.deletePost = function (req, res) {
    var postId = new ObjectId(req.params.id);
    models.Post.collection.remove({_id: postId}, function (err, data) {
        if (!err) {
            return(data);            
        }
        console.log(err);
    });
    res.redirect('/');
};

exports.updatePostTemplate = function (req, res) {
    var pst = models.Post.findById(req.params.id, function (err, pst) {
        if (!pst) {
            return res.redirect('/404');
        }
        res.render('post-update.html', {post: pst});
    });
};

exports.updatePost = function (req, res) {
    models.Post.findById(req.params.id, function (err, pst) {
        id = pst.id;
        pst = pst.toObject();
        delete pst._id;
        if (req.files.picture.originalFilename == '') {
            models.Post.update(
                { _id: id }, 
                { $set: {
                    title: req.body.title,
                    body: req.body.body
                }},
                { upsert: true },
                function (err, data) {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/posts/' + req.params.id);
            });
        }else if (imageMimetypes.indexOf(req.files.picture.type) != -1) {
            picture = req.files.picture;
            models.Post.update(
                { _id: id }, 
                { $set: {
                        title: req.body.title, 
                        body: req.body.body,
                        picture: picture.path.replace('static', '')
                    }
                },
                { upsert: true },
                function (err, data) {
                    if (err){
                        throw(err);
                    }
                    res.redirect('/posts/' + req.params.id);
                });
        }
    });
}

exports.createUserTemplate = function (req, res) {
    res.render('user-new.html', {});
}


exports.createUser =  function (req, res) {
    if (!stringUtils.validateEmail(req.body.email)) {
        return res.render('user-new.html', {emailError: 'Email not valid.'});
    }
    if (!req.body.password || !req.body.check_password || !req.body.email ) {
        return res.render('user-new.html', {formError: 'Make sure you filled Email, Password, and Check password.'});
    }
    if (req.body.password != req.body.check_password) {
        return res.render('user-new.html', {passwordError: 'Password and check password must be the same.'});
    }

    perms = {}
    
    // Check if any permission.
    if (req.body.permissions != null) {

        // If it is only one it comes as a string (of 10 characters).
        if (req.body.permissions.length < 10) {
            for (i=0; i<req.body.permissions.length; i++) {
                perms[req.body.permissions[i]] = true;
            }
    
        } else {
            perms[req.body.permissions] = true;
        }
    }
    var user = new models.User({
            email: req.body.email, 
            firstName: req.body.first_name,
            lastName: req.body.last_name,
            permissions: perms
        });
        user.save(function (err, user) {
            if(err){
                if(err.code == 11000){
                    res.render('user-new.html', {formError: 'A user with that email already exists.'});
                }
            }else{
                user.setPassword(req.body.password);
                res.redirect('/users');
            }
    });
}

exports.Users = function (req, res){
    models.User.find({}, function (err, data){
        if (!err && data) {
            res.render('users.html', { users: data });
        }
    });
}