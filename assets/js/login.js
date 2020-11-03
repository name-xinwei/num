$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义layui样式
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd != value) {
                return '两次密码不一致'
            }
        }
    })
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
    }
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.post('/api/reguser', data, function(res) {
            if (res.status != 0) {
                layer.msg(res.message)
            }
            layer.msg('注册成功了')
            $('#link_login').click()

        })

    })

    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/api/login",
            //快速获取表单数据
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                    // console.log(res.token);
                    //跳转后台主页
                localStorage.setItem('token', res.token)
                location.href = '/大事件/index.html'
            }
        });
    })
})