var express = require('express');
var app = express();

app.configure(function(){
	app.set('views', __dirname + '/templates');
	app.use(express.static(__dirname + '/static'));
	app.engine('html', require('ejs').renderFile);
	app.router = require('./routes')(app);
	app.use(function(req,res){
		res.render('404.html');
	});
});



app.listen(process.argv[2]);
console.log('Server listening on port ' + process.argv[2]);
