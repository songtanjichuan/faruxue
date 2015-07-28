module.exports = function (app) {
    require('./base')(app);
    require('./sign')(app);
    require('./home')(app);
    require('./interFlow')(app);
}
