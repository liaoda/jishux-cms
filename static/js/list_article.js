$(function(){$(".am-img-responsive").each(function(a,b){"/images/default_pic.png"!==$(this).attr("p-src")&&((a=$(this).attr("p-src"))&&a.endsWith("_.jpg")&&(a=a.substring(0,a.length-5)+"/thumb"),$(this).attr("class","lazyload am-img-responsive").attr("data-src",a).attr("src","http://cdn.jishux.com/default_pic_thumb.png"),$(this).parent().parent().next().attr("class","am-u-sm-9 am-u-md-10 am-list-main"),$(this).error(function(){var a=$(this);a.parent().parent().css("display","none");a.parent().parent().next().attr("class",
    "am-u-sm-12 am-u-md-12 am-list-main")}))})});