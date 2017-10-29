$(function () {
    function hideImage(that) {
        that.parent().parent().css('display', 'none');
        that.parent().parent().next().attr('class', 'am-u-sm-12 am-u-md-12 am-list-main')
    }
    $('.am-img-responsive').each(function (index, val) {
        if ($(this).attr('p-src') !== "/images/default_pic.png")  {
            var url = $(this).attr('p-src');
            if (url && url.endsWith('_.jpg')) { url = url.substring(0, url.length - 5) + '/thumb'; }
            $(this).attr('class', 'lazyload am-img-responsive').attr('data-src', url).attr('src', 'http://cdn.jishux.com/default_pic_thumb.png')
            $(this).parent().parent().next().attr('class', 'am-u-sm-9 am-u-md-10 am-list-main')
            $(this).error(function () { hideImage($(this)); })
        }
    })
    $('li.am-g.am-list-item-desced.am-list-item-thumbed.am-list-item-thumb-left').each(function () {
        $(this).hover(function () {
            $(this).css('background-color','rgba(0,0,0,.01)')
        },function () {
            $(this).css('background-color','white')
        })
    })
})