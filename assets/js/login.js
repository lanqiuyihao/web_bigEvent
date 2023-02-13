$(function(){
    // 点击“去注册新账号”链接
    $('#reg_link').on('click',function(){
        $('.login').hide()
        $('.reg').show()
    })
    // 点击“去登录”链接
    $('#login_link').on('click',function(){
        $('.login').show()
        $('.reg').hide()
    })

    // 表单验证
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        repwd:function(value){
            var pwd = $('.reg [name=password]').val()

            if(pwd!==value){
                return '两次密码不一致'
            }
        }
    })

    // 提交注册表单
    $('#reg_form').submit(function(e){
        e.preventDefault()
        $.post('/api/reguser',$(this).serialize(),function(res){
            if(res.status!=0) return layer.msg(res.message)
            layer.msg(res.message)
            $('#login_link').click()
        })
    })
    // 监听登录表单提交事件
    $('#login_form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0) return layer.msg(res.message)
                layer.msg(res.message)
                // 存储用户信息验证token
                localStorage.setItem('token',res.token)
                // 跳转到首页
                location.href = '/index.html'
            }
        })
    })
})