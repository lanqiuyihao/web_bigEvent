$(function(){
    getUserInfo()

    function getUserInfo(){
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            // headers:{
            //     Authorization:localStorage.getItem('token')
            // },
            success:function(res){
                if(res.status===0){
                    renderAvatar(res.data)
                }
            }
        })
    }
    function renderAvatar(user){
        var name = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;'+name)
        if(user.user_pic!==null){
            $('.layui-nav-img').attr('src',user.user_pic).show()
            $('.avatar_text').hide()
        }else{
            $('.layui-nav-img').hide()
            var first =  name[0].toUpperCase()
            $('.avatar_text').css('display','inline-block').html(first).show()
        }
    }


    var layer = layui.layer
    // 退出逻辑
    $('#btnLogout').on('click',function(){
        
        layer.confirm('确定退出吗？',{icon:3,title:'提示'},function(index){
            localStorage.removeItem('token')
            location.href = '/login.html'
            layer.close(index)
        })
    })
})

