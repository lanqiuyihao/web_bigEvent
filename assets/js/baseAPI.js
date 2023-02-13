// 每次发起Ajax请求之前拼接url
$.ajaxPrefilter(function(options){
    options.url = 'http://www.liulongbin.top:3007'+options.url
})