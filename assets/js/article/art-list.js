$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    // 查询对象
    var q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    // 格式化时间
    template.defaults.imports.dateFormat = function (value) {
        var dt = new Date(value)
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
        return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
    }

    function padZero(n) {
        return n < 10 ? '0' + n : n
    }

    // 渲染文章类别select表单项
    getCateList()

    getArticleList()

    function getCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl_cate', res)
                $('[name=cate_id').html(htmlStr)
                form.render(null, 'listForm')
            }
        })
    }

    // 筛选
    $('#listForm').on('submit', function (e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        getArticleList()
    })
    // 获取文章列表
    function getArticleList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    // 分页
    function renderPage(total) {
        //执行一个laypage实例
        laypage.render({
            elem: 'pageList' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total, //数据总数，从服务端得到
            limit:q.pagesize,
            curr:q.pagenum,
            layout:['count','limit','prev', 'page', 'next','skip'],
            limits:[2,3,5,10],
            jump:function(obj,first){
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                if(!first){
                    getArticleList()
                }
            }
        });
    }


    // 删除文章
    $('tbody').on('click','.btn-delete',function(){
        var id = $(this).attr('data-id')
        var len = $('.btn-delete').length
        layer.confirm('确认删除？',{icon:3,title:'提示'},function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/delete/'+id,
                success:function(res){
                    if(res.status!==0) return layer.msg(res.message)
                    layer.msg(res.message)
                    if(len===1){
                        q.pagenum = q.pagenum===1?1:q.pagenum-1
                    }
                    getArticleList()
                }
            })

            layer.close(index)
        })
    })
})






