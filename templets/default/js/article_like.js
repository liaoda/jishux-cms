$(function () {
    var aid= $('.blog-g-fixed').attr('aid');
    function getDigg(action) {
        var like_count = $('#like-count')
        if(!action){
            action='num'
        }
        $.get("/plus/digg_ajax.php?action="+action+"&formurl=caicai"+"&id="+aid,function(data,status){
            like_count.text(data)
        });
    }
    function postGood()
    {
        var saveid = Cookies.get('diggid');
        if(saveid)
        {
            console.log(saveid)
            var saveids = saveid.split(',');
            var hasid = false;
            saveid = '';
            j = 1;
            for(i=saveids.length-1;i>=0;i--)
            {
                if(saveids[i]===aid && hasid)
                {}
                else {
                    if(saveids[i]===aid && !hasid) hasid = true;
                    saveid += (saveid==='' ? saveids[i] : ','+saveids[i]);
                    j++;
                    if(j===20 && hasid) break;
                    if(j===19 && !hasid) break;
                }
            }
            if(hasid) { $('#btn-like').popover({
                content: '一次就好~'
            }); return; }
            else saveid += ','+aid;
            Cookies.set('diggid',saveid,{ expires: 1 });
            getDigg('good')
        }
        else
        {
            Cookies.set('diggid',aid,{ expires: 1 });
            getDigg('good')
        }
    }


    function postBadGood(ftype,fid)
    {
        var comment_floor = $('#'+ftype+fid);
        var saveid = Cookies.get('badgoodid');
        if(saveid)
        {
            console.log(saveid)
            var saveids = saveid.split(',');
            var hasid = false;
            saveid = '';
            j = 1;
            for(i=saveids.length-1;i>=0;i--)
            {
                if(saveids[i]===fid && hasid)
                {}
                else {
                    if(saveids[i]===fid && !hasid) hasid = true;
                    saveid += (saveid==='' ? saveids[i] : ','+saveids[i]);
                    j++;
                    if(j===10 && hasid) break;
                    if(j===9 && !hasid) break;
                }
            }
            if(hasid) { comment_floor.popover({
                content: '一次就好~'
            }); return; }
            else saveid += ','+fid;
            Cookies.set('badgoodid',saveid,{ expires: 1 });
        }
        else
        {
            Cookies.set('badgoodid',fid,{ expires: 1 });
        }

        var like_count = comment_floor.find('li')

        if(!action){
            action='num'
        }
        $.get("/plus/feedback.php?action="+ftype+"&formurl=caicai"+"&aid="+fid+'fid='+fid,function(data,status){
            like_count.text(data)
        });

    }
    
    $(".am-comment-actions>a").each(function () {
        var type = $(this).attr('type');
        var c_id =  $(this).attr('fid');
        console.log(type+'----'+c_id)
        if (type){
            $(this).click(function () {
                postBadGood(type,c_id)
            })
        }


    })

    $('#btn-like').click(function () {
        postGood()
    })
    getDigg()
})
