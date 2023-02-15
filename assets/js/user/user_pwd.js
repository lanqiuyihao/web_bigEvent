$(function(){
    var form = layui.form

    form.verify({
        pwd:[/^[\S]{6,12}$/,'必须包含6 到 12个字符之间，不能包含空格'],
        samePwd:function(value){
            if($('input[name=oldPwd]').val()===value){
                return '新旧密码不能相同'
            }
        },
        confirmPwd:function(value){
            if($('input[name=newPwd]').val()!==value){
                return '两次密码不一致'
            }
        }
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                $('.layui-form')[0].reset()
            }
        })
    })
})