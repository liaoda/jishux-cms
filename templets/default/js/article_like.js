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



    


    $('#btn-like').click(function () {
        postGood()
    })
    getDigg()
})
