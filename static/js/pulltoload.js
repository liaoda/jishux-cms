$(function () {
    var list = $('.am-list-news-bd>.am-list')
    var footer ='<li  class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">\n' +
        '                        <div class="am-u-sm-3 am-list-thumb">\n' +
        '                                <img p-src="---"  src="http://cdn.jishux.com/default_pic_thumb.png" class="am-img-responsive">\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div class="am-u-sm-9 am-list-main">\n' +
        '                            <h3 class="am-list-item-hd">\n' +
        '                                <a href="#" style="background-color: lightgrey"></a>\n' +
        '                            </h3>\n' +
        '                            <div class="am-list-item-text">\n' +
        '                                <span class="am-icon-server" style="background-color: lightgrey">  · </span>\n' +
        '                                <span class="am-icon-calendar" style="background-color: lightgrey">  · </span>\n' +
        '                                <span class="am-icon-eye" style="background-color: lightgrey">  </span>\n' +
        '                            </div>\n' +
        '                            <p class="place_holder am-list-item-text" style="background-color: lightgrey">...</p>\n' +
        '                        </div>\n' +
        '                    </li>'
    var loadConfig = {
        url_api:'/plus/list.php',
        typeid: $('.blog-g-fixed').attr('tid'),
        page:2,
        pagesize:15,  //这个就是滑动一次添加几条信息的参数设置
        loading : 0,
    };
    function  loadMoreApply(){
        if(loadConfig.loading === 0){
            var typeid = loadConfig.typeid;
            var page = loadConfig.page;
            var pagesize = loadConfig.pagesize;
            var url = loadConfig.url_api,data={ajax:'pullload',typeid:typeid,page:page,pagesize:pagesize};
            var sTop = document.body.scrollTop || document.documentElement.scrollTop, dHeight = $(document).height(), cHeight = document.documentElement.clientHeight;

            if (sTop + cHeight >= dHeight-20) {
                // $.AMUI.progress.start();
                loadConfig.loading = 1;
                list.append(footer)
                function ajax(url, data) {
                    $.ajax({url: url,data: data,async: true,type: 'GET',dataType: 'json',success: function(data) {
                        addContent(data);
                    }});
                }
                ajax(url,data);
            }
        }
    }
    function addContent (rs){
        if(rs.statu=== 1){
            console.log('success')
            var data = rs.list;
            var total = rs.total;
            var arr=[];
            var length = data.length;
            for(var i=0;i<length;i++){
                arr.push(data[i])
            }
            $('.am-list-news-bd>.am-list>li').eq(-1).remove();
            list.append(arr.join(''));
            loadConfig.load_num = rs.load_num;
            if(total<loadConfig.page*loadConfig.pagesize || loadConfig.page > loadConfig.load_num){
                window.removeEventListener('srcoll',loadMoreApply,false);
            }
            loadConfig.page++;
            loadConfig.loading = 0;
            // $.AMUI.progress.done();
        }
    }
    function pullLoad(){
        window.addEventListener('scroll', loadMoreApply, false);
    }
    pullLoad();
})