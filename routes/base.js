/**
 * Created by Administrator on 2015/6/29.
 */
module.exports = function(app){
    app.get('/', function (req, res) {
        res.render('index', { title: 'index' });
    });
}
