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
    if (verfity_code.length !== 4) {
        alert("请填写验证码！");
        return;
    }
    else {
        nvalidate = verfity_code
    }

    if (msg.length > 500) {
        alert("你的评论是不是太长了？请填写500字以内的评论。");
        return;
    }

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

    $msg.text('')

    f.find('#feedbackfid').val('')
    if (validate.val()) {
        var $validateimg = $('#validateimg');
        if ($validateimg) $validateimg.attr('src', "/include/vdimgck.php?");
        validate.val('')
    }


}

$('#btnComment').click(function () {
    PostComment()
})
LoadCommets(1);