<?php
/**
 *
 * 栏目列表/频道动态页
 *
 * @version        $Id: list.php 1 15:38 2010年7月8日Z tianya $
 * @package        DedeCMS.Site
 * @copyright      Copyright (c) 2007 - 2010, DesDev, Inc.
 * @license        http://help.dedecms.com/usersguide/license.html
 * @link           http://www.dedecms.com
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");

//$t1 = ExecTime();
//列表页瀑布流无限加载代码
header("Access-Control-Allow-Origin: *");
if(isset($_GET['ajax'])){

    if (!$_SERVER['HTTP_REFERER'] || !$_SERVER['HTTP_USER_AGENT']){
        echo 'warning:your ip was added in blacklist';
        exit();
    }
    $typeid = isset($_GET['typeid']) ? intval($_GET['typeid']): 0;//传递过来的分类ID
    $page = isset($_GET['page']) ? intval($_GET['page']): 0;//页码
    $pagesize = isset($_GET['pagesize']) ? intval($_GET['pagesize']): 10;//每页多少条，也就是一次加载多少条数据
    $start = $page>0 ? ($page-1)*$pagesize : 0;//数据获取的起始位置。即limit条件的第一个参数。
    $order = 'a.id';
    if (!isset($_GET['listtype'])){
        $typesql = $typeid ? " WHERE typeid=$typeid" : '';//这个是用于首页实现瀑布流加载，因为首页加载数据是无需分类的，所以要加以判断，如果无需
    }
    if (isset($_GET['listtype'])&& $typeid==0){
        switch ($_GET['listtype']){
            case 'img':
                $typesql ="WHERE a.flag LIKE '%p%' AND CHAR_LENGTH(a.litpic)>0 ";
                break;
            case 'like':
                $typesql = "WHERE UNIX_TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL 30 DAY)) <= a.pubdate";
                $order = 'a.goodpost';
                break;
            case 'click' :
                $typesql = "WHERE UNIX_TIMESTAMP(DATE_SUB(CURDATE(), INTERVAL 30 DAY)) <= a.pubdate";
                $order = 'a.click';
                break;
        }
    }

    $total_sql = "SELECT COUNT(id) as num FROM `#@__archives` $typesql ";
    $temp = $dsql->GetOne($total_sql);
    $total = 0;//数据总数
    $load_num =0;
    if(is_array($temp)){
        $load_num= round(($temp['num']-15)/$pagesize);//要加载的次数,因为默认已经加载了
        $total = $temp['num'];
    }
    $sql = "SELECT a.*,t.typedir,t.typename,t.isdefault,t.defaultname,t.namerule,
    t.namerule2,t.ispart, t.moresite,t.siteurl,t.sitepath
    FROM `#@__archives` as a JOIN `#@__arctype` AS t ON a.typeid=t.id $typesql ORDER BY $order DESC LIMIT $start,$pagesize";
    $dsql->SetQuery($sql);
    $dsql->Execute('list');
    $statu = 0;//是否有数据，默认没有数据
    $data = array();
    $index = 0;
    while($row = $dsql->GetArray("list")) {
        $row['info'] = $row['info'] = $row['infos'] = cn_substr($row['description'], 160);
        $row['filename'] = $row['arcurl'] = GetFileUrl($row['id'],
            $row['typeid'], $row['senddate'], $row['title'], $row['ismake'],
            $row['arcrank'], $row['namerule'], $row['typedir'], $row['money'],
            $row['filename'], $row['moresite'], $row['siteurl'], $row['sitepath']);
        $row['typeurl'] = GetTypeUrl($row['typeid'], $row['typedir'],
            $row['isdefault'], $row['defaultname'], $row['ispart'],
            $row['namerule2'], $row['moresite'], $row['siteurl'], $row['sitepath']);
        if ($row['litpic'] == '-' || $row['litpic'] == '') {
            $row['litpic'] = '';
        }
        if (!preg_match("#^http:\/\/#i", $row['litpic']) && $GLOBALS['cfg_multi_site'] == 'Y') {
            $row['litpic'] = $GLOBALS['cfg_mainsite'] . $row['litpic'];
        }
        $row['picname'] = $row['litpic'];//缩略图
        $row['stime'] = GetDateMK($row['pubdate']);
        $row['typelink'] = "" . $row['typename'] . "";//分类链
        $row['fulltitle'] = $row['title'];//完整的标题
        $row['title'] = cn_substr($row['title'], 80);//截取后的标题


         $article_class_name = 'am-u-sm-12 am-list-main';
         $data_src = "/images/default_pic.png";
         $img_class = 'am-img-responsive';
         $html_str = '';

        if ($row['picname']){
             $url = $row['picname'];
                    if ($url && strpos($url,'_.jpg') ) {
                        $url =substr($url,0,strlen($url)-5).'/thumb';
                    }
                    $data_src = $url;
                    $img_class = 'lazyload am-img-responsive';
                    $article_class_name = 'am-u-sm-9 am-u-md-10 am-list-main';
        }
        $html_str.= '<li class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left">';
        $html_str.= '<div class="am-u-sm-3 am-u-md-2 am-list-thumb">';
        $html_str.= '<a href="'.$row['arcurl'].'" title="'.$row['title'].'">';
        if($row['picname']){
            $html_str.= '<img src="http://cdn.jishux.com/default_pic_thumb.png" data-src="'.$data_src.'" class="'.$img_class.'">';
        }else{
            $html_str.= '<img data-src="'.$data_src.'" class="'.$img_class.'">';
        }
        $html_str.= '</a>';
        $html_str.= '</div>';
        $html_str.= '<div class="'.$article_class_name.'">';
        $html_str.= '<h3 class="am-list-item-hd">';
        $html_str.= ' <a href="'.$row['arcurl'].'" class="">'.$row['title'].'</a>';
        $html_str.= '</h3>';
        $html_str.= '<div class="am-list-item-text">';

        if (isset($_GET['listtype'])&& $typeid==0){

            switch ($_GET['listtype']){
                case 'img':
                    $html_str.= '<a href="'.$row['typeurl'] .'" class="am-icon-folder-o"> '. $row['typename'] .' · </a>';
                    $html_str.= ' <span class="am-icon-eye"> '. $row['click'] .' · </span>';
                    $html_str.= ' <span class="am-icon-heart-o"> '. $row['goodpost'] .' · </span>';
                    $html_str.= ' <span class="am-icon-clock-o"> '. $row['stime'] .'</span>';
                    break;
                case 'like':
                $html_str.= ' <span class="am-icon-heart-o"> '. $row['goodpost'] .' · </span>';
                $html_str.= ' <span class="am-icon-eye"> '. $row['click'] .' · </span>';
                $html_str.= ' <span class="am-icon-clock-o"> '. $row['stime'] .' · </span>';
                $html_str.= '<a href="'.$row['typeurl'] .'" class="am-icon-folder-o"> '. $row['typename'] .'</a>';
                    break;
                case 'click':
                $html_str.= ' <span class="am-icon-eye"> '. $row['click'] .' · </span>';
                $html_str.= ' <span class="am-icon-heart-o"> '. $row['goodpost'] .' · </span>';
                $html_str.= ' <span class="am-icon-clock-o"> '. $row['stime'] .' · </span>';
                $html_str.= '<a href="'.$row['typeurl'] .'" class="am-icon-folder-o"> '. $row['typename'] .'</a>';
                break;
            }
        }else{
            if ($index==0){
                $data[0]='<div style="text-align: center;padding: 5px 0;color: #0e90d2;">第 '.$page.' 页⬇</div>';

            }
            $html_str.= '<span class="am-icon-server"> '.$row['source'].' · </span>';
            $html_str.= ' <span class="am-icon-clock-o"> '. $row['stime'] .' · </span>';
            $html_str.= ' <span class="am-icon-heart-o"> '. $row['goodpost'] .' · </span>';
            $html_str.= '<span class="am-icon-eye"> '. $row['click'] .' </span>';
        }
        $html_str.= '</div>';
        $html_str.= '<p class="am-list-item-text">'.$row['description'].'...</p>';
        $html_str.= '</div>';
        $html_str.= '</li>';

        
//        $data[$index] = $row;
        if (isset($_GET['listtype'])&& $typeid==0){
            $data[$index] = $html_str;
        }else{
            $data[$index+1] = $html_str;
        }

        $index++;
    }
    if(!empty($data)){
        $statu = 1;//有数据
    }
    $result =array('statu'=>$statu,'list'=>$data,'total'=>$total,'load_num'=>$load_num);
    echo json_encode($result);//返回数据
    exit();
}

$tid = (isset($tid) && is_numeric($tid) ? $tid : 0);

$channelid = (isset($channelid) && is_numeric($channelid) ? $channelid : 0);

if($tid==0 && $channelid==0) die(" Request Error! ");
if(isset($TotalResult)) $TotalResult = intval(preg_replace("/[^\d]/", '', $TotalResult));


//如果指定了内容模型ID但没有指定栏目ID，那么自动获得为这个内容模型的第一个顶级栏目作为频道默认栏目
if(!empty($channelid) && empty($tid))
{
    $tinfos = $dsql->GetOne("SELECT tp.id,ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.channeltype='$channelid' And tp.reid=0 order by sortrank asc");
    if(!is_array($tinfos)) die(" No catalogs in the channel! ");
    $tid = $tinfos['id'];
}
else
{
    $tinfos = $dsql->GetOne("SELECT ch.issystem FROM `#@__arctype` tp LEFT JOIN `#@__channeltype` ch ON ch.id=tp.channeltype WHERE tp.id='$tid' ");
}

if($tinfos['issystem']==-1)
{
    $nativeplace = ( (empty($nativeplace) || !is_numeric($nativeplace)) ? 0 : $nativeplace );
    $infotype = ( (empty($infotype) || !is_numeric($infotype)) ? 0 : $infotype );
    if(!empty($keyword)) $keyword = FilterSearch($keyword);
    $cArr = array();
    if(!empty($nativeplace)) $cArr['nativeplace'] = $nativeplace;
    if(!empty($infotype)) $cArr['infotype'] = $infotype;
    if(!empty($keyword)) $cArr['keyword'] = $keyword;
    include(DEDEINC."/arc.sglistview.class.php");
    $lv = new SgListView($tid,$cArr);
} else {
    include(DEDEINC."/arc.listview.class.php");
    $lv = new ListView($tid);
    //对设置了会员级别的栏目进行处理
    if(isset($lv->Fields['corank']) && $lv->Fields['corank'] > 0)
    {
        require_once(DEDEINC.'/memberlogin.class.php');
        $cfg_ml = new MemberLogin();
        if( $cfg_ml->M_Rank < $lv->Fields['corank'] )
        {
            $dsql->Execute('me' , "SELECT * FROM `#@__arcrank` ");
            while($row = $dsql->GetObject('me'))
            {
                $memberTypes[$row->rank] = $row->membername;
            }
            $memberTypes[0] = "游客或没权限会员";
            $msgtitle = "你没有权限浏览栏目：{$lv->Fields['typename']} ！";
            $moremsg = "这个栏目需要 <font color='red'>".$memberTypes[$lv->Fields['corank']]."</font> 才能访问，你目前是：<font color='red'>".$memberTypes[$cfg_ml->M_Rank]."</font> ！";
            include_once(DEDETEMPLATE.'/plus/view_msg_catalog.htm');
            exit();
        }
    }
}

if($lv->IsError) ParamError();

$lv->Display();
