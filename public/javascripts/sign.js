/**
 * Created by Administrator on 2015/5/28.
 */
function login(){
    $.ajax({
        url: '/login',
        type: 'POST',
        data: $('form').serialize()
        , success: function (data, status){
            if(status == 'success'){
                location.href='home';
            }
        }
        , error:function(err, status){
            location.href='/login';
        }
    })
}
function register(){
    var data = $("form").serialize();
    $.ajax({
        url:'/register',
        type:'post',
        data:data,
        success:function(data,status){
            if(status == 'success'){
                location.href='home';
            }
        },
        error:function(err, res){
            location.href='/';
        }
    });
}
