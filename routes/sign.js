/**
 * Created by Administrator on 2015/6/29.
 */
module.exports = function (app) {
    app.get('/login', function (req, res) {
        res.render('login', {title: "login"});
    });
    app.get('/register', function (req, res) {
        res.render('register', {title: "register"});
    });

    app.post('/register', function (req, res) {
        var user = db.models('user'),
            name = req.body.name;
        console.log(name);
        user.findOne({name: name}, function (error, doc) {
            if (error) {
                console.log(error);
                res.send(500);
            } else if (doc) {
                console.log('用户名已存在');
                res.send(500);
            } else {
                user.create({
                    name: name,
                    password: req.body.password
                }, function (error, doc) {
                    if (error) {
                        res.send(500);
                    } else {
                        req.session.user = doc;
                        res.send(200);
                    }
                });
            }
        });
    });

    app.post('/login', function (req, res) {
        var user = db.models('user');
        user.findOne({name: req.body.name, password: req.body.password}, function (err, user) {
            if (user) {
                req.session.user = user;
                res.status(200).end();
            } else {
                console.log('用户名密码错误');
                res.status(500).end();
            }
        })
    });
}