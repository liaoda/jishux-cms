var aid = $('.blog-g-fixed').attr('aid');
var commentList = $('#ulcommentlist')

function LoadCommets(page) {
    var taget_obj = $('#commetcontent').text()
    var waithtml = "<div style='line-height:50px'><img src='/plus/images/loadinglit.gif' />评论加载中...</div>";
    var data = {
        dopost: 'getlist',
        aid: aid,
        page: page
    }
    $.ajax({
        url: '/plus/feedback_ajax.php', data: data, async: true, type: 'GET', success: function (data) {
            commentList.append(data)
        }
    });

}

function PostComment() {

    var f = $('.am-form')
    var $msg = $('#msg');
    var msg = $msg.val();

    var nface = '6';
    var nfeedbacktype = 'feedback';
    var nvalidate = '';
    var nnotuser = '1';
    var nusername = '------';
    if (msg.length < 10) {
        alert("请至少输入10个字！");
        return;
    }


    var validate = f.find('#validate');
    var verfity_code = validate.val()
    if (verfity_code.length()!==4) {
        alert("请填写验证码！");
        return;
    }
    else {
        nvalidate =verfity_code
    }

    if (msg.length > 500) {
        alert("你的评论是不是太长了？请填写500字以内的评论。");
        return;
    }
    // if (f.feedbacktype) {
    //     for (var i = 0; i < f.feedbacktype.length; i++)
    //         if (f.feedbacktype[i].checked) nfeedbacktype = f.feedbacktype[i].value;
    // }
    // location.href="#newcomment";

    // if (f.username) nusername = f.username.value;
    $msg.text('')
    var data = {
        sendlang: 'zh-CN',
        dopost: 'send',
        aid: aid,
        fid: f.find('#feedbackfid').val(),
        face: nface,
        feedbacktype: nfeedbacktype,
        validate: nvalidate,
        notuser: nnotuser,
        username: nusername,
        pwd: '-----pwd',
        msg: msg,

    }

    $.ajax({
        url: '/plus/feedback_ajax.php', data: data, async: true, type: 'POST', success: function (data) {
            commentList.append(data)
        }
    });
    // var myajax = new DedeAjax(taget_obj, false, true, '', '', waithtml);
    // myajax.sendlang = '{dede:global.cfg_soft_lang/}';
    // myajax.AddKeyN('dopost', 'send');
    // myajax.AddKeyN('aid', '{dede:field.id/}');
    // myajax.AddKeyN('fid', f.fid.value);
    // myajax.AddKeyN('face', nface);
    // myajax.AddKeyN('feedbacktype', nfeedbacktype);
    // myajax.AddKeyN('validate', nvalidate);
    // myajax.AddKeyN('notuser', nnotuser);
    // myajax.AddKeyN('username', nusername);
    // myajax.AddKeyN('pwd', npwd);
    // myajax.AddKeyN('msg', msg);
    // myajax.SendPost2('/plus/feedback_ajax.php');
    //msg = '';
    // CKEDITOR.instances.msg.setData('');
    $msg.text('')
    // document.getElementById("msg").value = "";

    //taget_obj.removeAttribute('id');
    f.find('#feedbackfid').val('')
    if (validate.val()) {
        var $validateimg = $('#validateimg');
        if ($validateimg) $validateimg.attr('src', "/plus/include/vdimgck.php?" + f.validate.value);
        validate.val('')
    }


}

$('#btnComment').click(function () {
    PostComment()
})
LoadCommets(1);