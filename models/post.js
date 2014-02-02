var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/b');

var db = mongoose.createConnection('localhost', 'b');

db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function(){
	console.log('Database connected');
});

var postSchema = mongoose.Schema({
	title: String,
	picture: String,
	body: String
});

var Post = mongoose.model('Post', postSchema);

module.exports = Post;