$(function () {
    var loadmore = $('.load-more')
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
                $.AMUI.progress.start();
                loadConfig.loading = 1;
                loadmore.css('display','block')
                function ajax(url, data) {
                    $.ajax({url: url,data: data,async: false,type: 'GET',dataType: 'json',success: function(data) {
                        addContent(data);
                    }});
                }
                ajax(url,data);
            }
        }
    }
    function addContent (rs){
        if(rs.statu== 1){
            var data = rs.list;
            var total = rs.total;
            var arr=[];
            var length = data.length;
            for(var i=0;i<length;i++){
                arr.push(data[i])
            }
            $('.am-list-news-bd>.am-list').append(arr.join(''));
            loadConfig.load_num = rs.load_num;
            if(total<loadConfig.page*loadConfig.pagesize || loadConfig.page > loadConfig.load_num){
                window.removeEventListener('srcoll',loadMoreApply,false);
            }
            loadConfig.page++;
            loadConfig.loading = 0;
            loadmore.css('display','none')
            $.AMUI.progress.done();
        }
    }
    function pullLoad(){
        window.addEventListener('scroll', loadMoreApply, false);
    }
    pullLoad();
})