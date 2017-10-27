var aid= $('.blog-g-fixed').attr('aid');
function LoadCommets(page)
{
    var taget_obj = $('#commetcontent').text()
    var waithtml = "<div style='line-height:50px'><img src='/plus/images/loadinglit.gif' />评论加载中...</div>";
    var data = {
        dopost:'getlist',
        aid:aid,
        page:page
    }
    $.ajax({url: '/plus/feedback_ajax.php',data: data,async: true,type: 'GET',success: function(data) {
        console.log(data)
    }});

}
function PostComment()
{

    var f = document.feedback;
    var $msg = $('#msg');
    var msg = $msg.text();

    var nface = '6';
    var nfeedbacktype = 'feedback';
    var nvalidate = '';
    var nnotuser = '';
    var nusername = '';
    var npwd = '';
    var taget_obj = $('#commetcontentNew');
    var waithtml = "<div style='line-height:30px'><img src='/plus/images/loadinglit.gif' />正在发送中...</div>";
    if(msg.length < 10)
    {
        alert("请至少输入10个字！");
        return;
    }
    if(f.validate)
    {
        if(f.validate.value==='') {
            alert("请填写验证码！");
            return;
        }
        else {
            nvalidate = f.validate.value;
        }
    }
    if(msg.length > 500)
    {
        alert("你的评论是不是太长了？请填写500字以内的评论。");
        return;
    }
    if(f.feedbacktype) {
        for(var i=0; i < f.feedbacktype.length; i++)
            if(f.feedbacktype[i].checked) nfeedbacktype = f.feedbacktype[i].value;
    }
    location.href="#newcomment";

    if(f.notuser.checked) nnotuser = '1';
    if(f.username) nusername = f.username.value;
    if(f.pwd) npwd = f.pwd.value;
    if(f.msg) msg = f.msg.value;
    document.getElementById("msg").value= '';
    $msg.text('')

    var myajax = new DedeAjax(taget_obj, false, true, '', '', waithtml);
    myajax.sendlang = '{dede:global.cfg_soft_lang/}';
    myajax.AddKeyN('dopost', 'send');
    myajax.AddKeyN('aid', '{dede:field.id/}');
    myajax.AddKeyN('fid', f.fid.value);
    myajax.AddKeyN('face', nface);
    myajax.AddKeyN('feedbacktype', nfeedbacktype);
    myajax.AddKeyN('validate', nvalidate);
    myajax.AddKeyN('notuser', nnotuser);
    myajax.AddKeyN('username', nusername);
    myajax.AddKeyN('pwd', npwd);
    myajax.AddKeyN('msg', msg);
    myajax.SendPost2('/plus/feedback_ajax.php');
    //msg = '';
    CKEDITOR.instances.msg.setData('');
    document.getElementById("msg").setData('');
    document.getElementById("msg").value = "";

    //taget_obj.removeAttribute('id');
    f.fid.value = 0;
    if(f.validate)
    {
        if($('#validateimg')) $('#validateimg').attr('src',"/plus/include/vdimgck.php?"+f.validate.value) ;
        f.validate.value = '';
    }


}
$('#btnComment').click(function () {
    PostComment()
})
LoadCommets(1);