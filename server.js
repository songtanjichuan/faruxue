var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
//var MongoStore = require('connect-mongo')(session);

global.db = require('./database/dbs');
db.connect();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html', require('ejs').__express);

app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'node',
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60}
}));
app.use(function(req, res, next){
    res.locals.user = req.session.user;
    next();
});
require('./routes')(app);
app.set('port', process.env.PORT || 3000);
app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
module.exports = app;
