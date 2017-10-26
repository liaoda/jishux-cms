$(function () {
    var list = $('.load-container')
    var subnavs = $('.jsx-subnav>li')
    // var listtype = list.attr('listtype')
    var tid = $('.blog-g-fixed').attr('tid')
    var footer = '<li  class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">\n' +
        '                        <div class="am-u-sm-3 am-u-md-2 am-list-thumb">\n' +
        '                                <img p-src="---"  src="http://cdn.jishux.com/default_pic_thumb.png" class="am-img-responsive">\n' +
        '\n' +
        '                        </div>\n' +
        '                        <div class="am-u-sm-9 am-u-md-10 am-list-main">\n' +
        '                            <h3 class="am-list-item-text">\n' +
        '                                <a href="#" style="background-color: lightgrey">　　　　　　　　　　　</a>\n' +
        '                            </h3>\n' +
        '                            <div class="am-list-item-text">\n' +
        '                                <span class="am-icon-server" style="background-color: lightgrey">  · </span>\n' +
        '                                <span class="am-icon-clock-o" style="background-color: lightgrey">  · </span>\n' +
        '                                <span class="am-icon-eye" style="background-color: lightgrey">  </span>\n' +
        '                            </div>\n' +
        '                            <p class="place_holder am-list-item-text" style="background-color: lightgrey">...</p>\n' +
        '                            <p class="place_holder2 am-list-item-text" style="background-color: lightgrey">...</p>\n' +
        '                        </div>\n' +
        '                    </li>'
    var loadConfig = {
        url_api: '/plus/list.php',
        typeid: tid,
        page: 2,
        listtype: 'img',
        pagesize: 15,  //这个就是滑动一次添加几条信息的参数设置
        loading: 0,
    };
    
    function startAJAX() {
        
    }

    function loadMoreApply(ltype) {
        if (loadConfig.loading === 0) {
            var typeid = loadConfig.typeid;
            var page =ltype? 1: loadConfig.page;
            var listtype =ltype?ltype : loadConfig.listtype;
            var pagesize = loadConfig.pagesize;
            var url = loadConfig.url_api, data = {ajax: 'pullload', typeid: typeid,listtype:listtype, page: page, pagesize: pagesize};

            $.AMUI.progress.start();
            loadConfig.loading = 1;
            list.append(footer)

            function ajax(url, data) {
                $.ajax({
                    url: url, data: data, async: true, type: 'GET', dataType: 'json', success: function (data) {
                        addContent(data);
                    }
                });
            }

            ajax(url, data);

        }
    }

    function addContent(rs) {
        if (rs.statu === 1) {
            console.log('success')
            var data = rs.list;
            var total = rs.total;
            var arr = [];
            var length = data.length;
            for (var i = 0; i < length; i++) {
                arr.push(data[i])
            }
            list.find('li').eq(-1).remove();
            list.append(arr.join(''));
            loadConfig.load_num = rs.load_num;
            if (total < loadConfig.page * loadConfig.pagesize || loadConfig.page > loadConfig.load_num) {
                window.removeEventListener('srcoll', loadMoreApply, false);
            }
            loadConfig.page++;
            loadConfig.loading = 0;
            $.AMUI.progress.done();
        }
    }


    $('.load-more').click(function () {
        $('.jishux-list-types').animate({opacity:'0.2',height:'0px'},function () {
            $(this).remove();
        })
        loadMoreApply()
    })
    subnavs.each(function (index, val) {
        var listType = $(this).attr('listtype')
        $(this).click(function () {
            loadConfig.listtype = listType
            loadConfig.page=1
            list.find('li').remove()
            loadMoreApply(listType)
        })
    })

})