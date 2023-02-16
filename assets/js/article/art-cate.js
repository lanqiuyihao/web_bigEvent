$(function () {
    var layer = layui.layer
    var form = layui.form
    initCateList()

    // 添加功能
    var openIndex = null
    $('#addCate').on('click', function () {
        openIndex = layer.open({
            type: 1,
            title: '添加类别',
            content: $('#cateForm').html(),
            area: ['500px', '250px']
        })
    })

    $('body').on('submit', '#addCateForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) return layer.msg(res.message)
                layer.close(openIndex)
                initCateList()
            }
        })
    })

    // 编辑功能
    var indexEdit = null
    $('body').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            title: '修改类别',
            content: $('#editForm').html(),
            area: ['500px', '250px']
        })
        var id = $(this).attr('data-id')
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                form.val('edit-form', res.data)
            }
        })
    })



    $('body').on('submit', '#editCateForm', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) return layer.msg(res.message)
                layer.msg(res.message)
                layer.close(indexEdit)
                initCateList()
            }
        })
    })
    // 删除操作
    $('body').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/'+id,
                success:function(res){
                    if(res.status!=0) return layer.msg(res.message)
                    initCateList()
                    layer.close(index);
                }
            })
        });
    })
})
function initCateList() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            var htmlStr = template('cate-list', res)
            $('tbody').html(htmlStr)
        }
    })
}