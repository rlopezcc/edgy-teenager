var dB = require('mongodb').Db;
var Server = require('mongodb').Server;
var dPort = 27017;
var dHost = 'localhost';
var dName = 'b';

var BLOG = {}

BLOG.db = new dB(dName, new Server(dHost, dPort, {auto_reconnect: true}, {}));

BLOG.db.open(function(err, data){
	if (err){
		console.log(err);
	}else{
		console.log('Conectado a ' + dName + ', puerto ' + dPort);
	}
});

BLOG.posts = BLOG.db.collection('posts');

module.exports = BLOG;