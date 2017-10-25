$(function () {
    function showDeskTopNotice(title,msg){
        var Notification = window.Notification || window.mozNotification || window.webkitNotification;
        if(Notification){
            Notification.requestPermission(function(status){
                //status默认值'default'等同于拒绝 'denied' 意味着用户不想要通知 'granted' 意味着用户同意启用通知
                if("granted" !== status){
                    console.log('granted')
                }else{
                    var tag = "sds"+Math.random();
                    var notify = new Notification(
                        title,
                        {
                            dir:'auto',
                            lang:'zh-CN',
                            tag:tag,//实例化的notification的id
                            icon:'http://www.jishux.com/favicon.ico',//通知的缩略图,//icon 支持ico、png、jpg、jpeg格式
                            body:msg //通知的具体内容
                        }
                    );
                    notify.onclick=function(){
                        //如果通知消息被点击,通知窗口将被激活
                        window.focus();
                    };
                    notify.onerror = function () {
                        console.log("通知出错！！！");
                    };
                    notify.onshow = function () {
                        setTimeout(function(){
                            notify.close();
                        },2000)
                    };
                    notify.onclose = function () {
                        console.log("通知消息关闭！！！");
                    };
                }
            });
        }else{
            console.log("您的浏览器不支持桌面消息");
        }
    }

    $("code,pre").bind({
        copy : function(){
            showDeskTopNotice("(｡･∀･)ﾉﾞ嗨","你要的代码已经复制到剪贴板，接下来看你的了~")
        }
    });
})