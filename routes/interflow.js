/**
 * Created by Administrator on 2015/7/5.
 */
module.exports = function(app){
    app.get('/interFlow', function (req, res) {
        res.render('interFlow', { title: 'interFlow' });
    });
}
