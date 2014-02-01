var BLOG = require('./models/post');

module.exports = function(app){
	app.get('/', function(req, res){
		BLOG.posts.find().toArray(function(err, psts){
			if (err){
				console.log(err);
			}else{
				res.render('index.html', {posts: psts ? psts : ['Nothing']});
			}
		});
	});
	app.get('/post/:id', function(req, res){

		try{
			var objectId = new require('mongodb').ObjectID(req.params.id);
		}catch(err){
			console.log(err);
			res.redirect('/404');
		}

		var pst = BLOG.posts.find({_id: objectId}).next(function(err, pst){
			if (err){
				console.log(err);
			}else{
				res.render('post-detail.html', {post: pst ? pst : {}});
			}
		});
	});
}