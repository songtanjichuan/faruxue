/**
 * Created by Administrator on 2015/6/8.
 */
var connect = require('connect'),
    users = require('./users');

var server = connect(
    connect.logger('dev'),
    connect.bodyParser(),
    connect.cookieParser(),
    connect.session({secret: 'node'}),
    function (req, res, next) {
        if ('/' == req.url && req.session.logged_in) {
            res.writeHeader(200, {'Content-Type': 'text/html'});
            res.end("welcome" + req.session.name + '<a href="/logput">Logput</a>');
        } else {
            next();
        }
    },
    function (req, res, next) {
        if ('/' == req.url && 'GET' == req.method) {
            res.writeHeader(200, {'Content-Type': 'text/html'});
            res.end([
                '<form action="/logout" method="POST">',
                '<firldset>',
                '<legend>Please log in</legend>',
                '<p>User: </p> <input type="text" name="user" />',
                '<p>Password: </p> <input type="password" name="password" />',
                '<button>Submit</button>',
                '</fieldset>',
                '</form>'
            ].join(''));
        } else {
            next();
        }
    },
    function(req, res, next){
        if('/login' == req.url && 'POST' == req.method){
            res.writeHead(200);
            if(!users[req.body.user] || req.body.password != users[req.body.user]){
                res.end('Bad 失败');
            }else{
                req.session.logged_in = true;
                req.session.name = users[req.body.user].name;
                res.end('Authenticated');
            }
        }else{
            next();
        }
    },
    function(req, res, next){
        if('/logput' == req.url){
            req.session.logout_in = false;
            res.writeHead(200);
            res.end('Logged out!');
        }else{
            next();
        }
    }
)

server.listen(80);