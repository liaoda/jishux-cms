$(".blog-content img").wrap("<div style=\"text-align: center;\"><a data-fancybox='gallery' href='#'></a></div>").each(function(a,c){var d=$(this).attr("data-src");if(!d){var b=$(this).attr("data-original");if(!b){b=$(this).attr("src")}$(this).parent().attr("href",b);$(this).attr("class","lazyload").attr("data-src",b).attr("src","https://cdn.jishux.com/default_pic.png")}else{$(this).attr("class","lazyload").attr("src","https://cdn.jishux.com/default_pic.png").parent().attr("href",d)}$(this).error(function(){$(this).hide()})});