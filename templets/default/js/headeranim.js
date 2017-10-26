$(function () {
    window.lazySizesConfig = window.lazySizesConfig || {};
    window.lazySizesConfig.expand=-50;
    var i = 1;
    topbar = $(".am-topbar");
    topbar.attr('i', '0');
    $(window).scroll(function () {
        var before = $(window).scrollTop();
        $(window).scroll(function () {
            var after = $(window).scrollTop();
            if (before - after < -80) {
                //                         console.log('上');
                if (i === 1 ) {
                    topbar.fadeOut();
                    i = 0;
                }
                before = after;
            }
            if (before - after > 80) {
                if (i === 0 ) {
                    topbar.fadeIn();
                    i = 1;
                }
                before = after;
            }
        });
    });
})