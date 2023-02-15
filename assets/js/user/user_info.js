$(function(){

    var layer = layui.layer
    var form = layui.form



    initUserInfo()

    form.verify({
        nickname:function(value){
            if(value.length<1 || value.length>6){
                return '用户昵称必须在1 到 6个字符之间'
            }
        }
    })


    $('#userForm').on('submit',function(e){
        e.preventDefault()

        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0) return layer.msg(res.message)
                layer.msg(res.message)
                initUserInfo()
                
                parent.getUserInfo()
            }
        })
    })

    $('#resetForm').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
})

function initUserInfo(){
    var form = layui.form
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        success:function(res){
            if(res.status!==0){
                return layer.msg(res.message)
            }
            form.val('formDemo',res.data)
        }
    })
}