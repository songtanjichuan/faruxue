/**
 * Created by Administrator on 2015/6/29.
 */
module.exports = function (app) {
    app.get('/home', function (req, res) {
        console.log(req.session);
        res.render('home', {title: "home"});
    });
}