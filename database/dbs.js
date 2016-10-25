/**
 * Created by Administrator on 2015/5/31.
 */
var mongoose = require('mongoose'),
    models = require('./models'),
    Schema = mongoose.Schema;
for(var i in models){
    mongoose.model(i,new Schema(models[i]));
}
var _getModel= function (type){
    return mongoose.model(type);
}
var _connect = function (type) {
    if (type) {
        mongoose.connect('mongodb://localhost:27017/test');
        mongoose.connection.on('error', function (error) {
            console.log('数据库连接失败：' + error);
        });
        console.log('----------------连接数据库-----------------');
    } else {
        mongoose.disconnect();
    }
};
module.exports = {
    models: function(type){
        return _getModel(type);
    },
    connect: function(){
        return _connect(true);
    },
    disconnect: function(){
        return _connect(false)
    }
};

