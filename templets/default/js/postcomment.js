var aid = $('.blog-g-fixed').attr('aid');
var commentList = $('#ulcommentlist')
var $btnComment = $('#btnComment');
var state = 0;

function scrollListener() {
    var sTop = document.body.scrollTop || document.documentElement.scrollTop,
        cHeight = document.documentElement.clientHeight;
    if (sTop + cHeight > $btnComment.offset().top) {
        if (!state) {
            LoadCommets(1);
        }
    }
}
function postBadGood(ftype, fid) {
    var ssssid= '#' + ftype + fid
    var comment_floor = $(ssssid);
    var saveid = Cookies.get('badgoodid');
    if (saveid) {
        var saveids = saveid.split(',');
        var hasid = false;
        saveid = '';
        j = 1;
        for (i = saveids.length - 1; i >= 0; i--) {
            if (saveids[i] === fid && hasid) {
            }
            else {
                if (saveids[i] === fid && !hasid) hasid = true;
                saveid += (saveid === '' ? saveids[i] : ',' + saveids[i]);
                j++;
                if (j === 10 && hasid) break;
                if (j === 9 && !hasid) break;
            }
        }
        if (hasid) {
            comment_floor.popover({
                content: '一次就好~'
            });
            return;
        }
        else saveid += ',' + fid;
        Cookies.set('badgoodid', saveid, {expires: 1});
    }
    else {
        Cookies.set('badgoodid', fid, {expires: 1});
    }
    var li = '#'
    if (ftype==='goodfb'){
        li +='g'
    }else{
        li+='b'
    }
    var like_count = $(li+fid)
    $.get("/plus/feedback.php?action=" + ftype + "&formurl=caicai" + "&aid=" + fid + '&fid=' + fid, function (data, status) {
        like_count.text(' '+data+' ')
    });

}


function LoadCommets(page) {
    window.removeEventListener('scroll',scrollListener)
    state = 1;
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

    var $f = $('.am-form')
    var $msg = $('#msg');
    var msg = $msg.val();
    var nvalidate = '';
    var nusername = '------';
    var validate = $f.find('#validate');
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
        fid: $f.find('#feedbackfid').val(),
        face: '6',
        feedbacktype: 'feedback',
        validate: nvalidate,
        notuser: '1',
        username: nusername,
        pwd: '-----pwd',
        msg: msg,

    }

    $.ajax({
        url: '/plus/feedback_ajax.php', data: data, async: true, type: 'POST', success: function (data) {
           if (data.substring(0,3)==='错误：'){
               alert(data)
           }else{
               $msg.val('');
               if (validate.val()) {
                   var $validateimg = $('#validateimg');
                   if ($validateimg) $validateimg.attr('src', "/include/vdimgck.php?");
                   validate.val('')
               }
               commentList.append(data)

           }
        }
    });

    // $msg.text('')




}

$btnComment.click(function () {
    PostComment()
})



function pullLoad() {

    window.addEventListener('scroll',scrollListener, false);
}

pullLoad();