var express = require('express');
var mongoose = require('mongoose');
var models = require('./models');
var busboy = require('connect-busboy');
var middlewares = require('./middlewares');
var secrets = require('./secrets.json');
var app = express();

app.use(express.favicon(__dirname + '/static/img/favicon.png'));
app.use(express.cookieParser());
app.use(express.session({ secret: secrets.sessionKey }));
app.set('views', __dirname + '/templates');
app.use(express.bodyParser({uploadDir: './static/img/post-pics'}));
app.use(busboy());
app.use(express.static(__dirname + '/static'));
app.use(function (req, res, next) {
    // Make user accessible from template.
    if (req.session.userId != null) {
        models.User.findById(req.session.userId, function (err, user) {
            if (!err) {
                res.locals.user = user;
                req.user = user;
            }
        });
    }
    next();
});
app.use(middlewares.addConfig);
app.router = require('./routes')(app);
app.engine('html', require('ejs').renderFile);

app.use(function (req, res) {
    res.status(404);
    res.render('404.html', {url: req.url});
});

app.listen(process.argv[2]);
console.log('Server listening on port ' + process.argv[2]);
