var express = require('express');
var app = express();

app.configure(function(){
	app.use(express.favicon(__dirname + '/static/img/favicon.png'));
	app.set('views', __dirname + '/templates');
	app.use(express.bodyParser({uploadDir: './static/img/post-pics'}));
	app.use(express.static(__dirname + '/static'));
	app.use(express.multipart());
	app.engine('html', require('ejs').renderFile);
	app.router = require('./routes')(app);
	app.use(function(req,res){
		res.status(404);
		res.render('404.html', {url: req.url});
	});
});

app.listen(process.argv[2]);
console.log('Server listening on port ' + process.argv[2]);
