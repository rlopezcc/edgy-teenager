var qs = require('querystring');
var posts = require('./models/post');

var imageMimetypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

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

	app.get('/posts/new', function(req, res){
		res.render('post-new.html', {});
	});

	app.post('/posts/new', function(req, res){
		picture = req.files.picture;
		if(imageMimetypes.indexOf(picture.type) != -1){
			posts.collection.insert({title: req.body.title, 
				body: req.body.body, 
				picture: picture.path.replace('static', '')}, function(err, data){ 
					res.redirect('/'); 
				});
		}
	});

	app.get('/posts/:id', function(req, res){
		try{
			var objectId = new require('mongoose').Types.ObjectId(req.params.id);

			var pst = posts.findOne({_id: objectId}, function(err, pst){
				if (!pst){
					res.redirect('/404');
				}else{
					res.render('post-detail.html', {post: pst ? pst : {}});
				}
			});
		}catch(err){
			res.redirect('/404');
		}
	});
}
