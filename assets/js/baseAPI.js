// 每次发起Ajax请求之前拼接url
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007'+options.url

    // 为有权限的接口统一配置 header头
    if(options.url.indexOf('/my/')!==-1){
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 为后台有权限页面设置权限访问
    options.complete = function(res){
        if(res.responseJSON.status===1 && res.responseJSON.message.indexOf('失败')!==-1){
            
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})