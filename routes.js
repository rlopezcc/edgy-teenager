var posts = require('./models/post');

module.exports = function(app){

	app.get('/', function(req, res){
		
		posts.find({}, function(err, psts){
			if (err){
				console.log(err);
			}else{
				res.render('index.html', {posts: psts ? psts : ['Still no posts.']});
			}
		});
	
	});

	app.get('/posts/:id', function(req, res){

		try{
			var objectId = new require('mongoose').ObjectID(req.params.id);
		}catch(err){
			console.log(err);
			// TODO: 404 code in response header.
			res.redirect('/404');
		}
		var pst = posts.findOne({_id: objectId}, function(err, pst){
			if (err){
				console.log(err);
			}else{
				res.render('post-detail.html', {post: pst ? pst : {}});
			}
		});
	});
}