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
                    topbar.animate({opacity:'0.2',height:'0px'})
                    i = 0;
                }
                before = after;
            }
            if (before - after > 80) {
                if (i === 0 ) {
                    topbar.fadeIn(animate({opacity:'1',height:''}));
                    i = 1;
                }
                before = after;
            }
        });
    });
})