$(".blog-content img").wrap("<a data-fancybox='gallery' href='#'></a>").each(function (index, val) {
    var data_src = $(this).attr('data-src');
    if (!data_src){
    var original = $(this).attr('data-original');
    if (!original){
        original= $(this).attr('src');
    }
    $(this).parent().attr('href', original);
    $(this).attr('class','lazyload').attr('data-src',original).attr('src','http://cdn.jishux.com/default_pic.png')
    }else{
        $(this).attr('class','lazyload').attr('src','http://cdn.jishux.com/default_pic.png').parent().attr('href', data_src);
    }
    $(this).error(function () {
        $(this).hide()
    })
})