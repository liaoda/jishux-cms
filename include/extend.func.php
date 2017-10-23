<?php
function litimgurls($imgid=0)
{
    global $lit_imglist,$dsql;
    //获取附加表
    $row = $dsql->GetOne("SELECT c.addtable FROM #@__archives AS a LEFT JOIN #@__channeltype AS c 
                                                            ON a.channel=c.id where a.id='$imgid'");
    $addtable = trim($row['addtable']);
    
    //获取图片附加表imgurls字段内容进行处理
    $row = $dsql->GetOne("Select imgurls From `$addtable` where aid='$imgid'");
    
    //调用inc_channel_unit.php中ChannelUnit类
    $ChannelUnit = new ChannelUnit(2,$imgid);
    
    //调用ChannelUnit类中GetlitImgLinks方法处理缩略图
    $lit_imglist = $ChannelUnit->GetlitImgLinks($row['imgurls']);
    
    //返回结果
    return $lit_imglist;
}

	function verification($ip){
		return preg_match('/^([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))(\.([1-9]|([1-9]\d)|(1\d\d)|(2([0-4]\d|5[0-5])))){3}$/', $ip);
	}
	
	/**
	 * 
	 * 根据IP返回地区信息
	 * @param String $ip
	 * @return Array array(国家，省，市)
	 */
	function ip_to_district($ip){
		if($ip=='127.0.0.1'){
			return '本地';
		}
		$url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip=".$ip;
		$ip = file_get_contents($url);  
		if(preg_match_all("/[".chr(0xa1)."-".chr(0xff)."]+/",$ip,$match)){
			if(empty($match[0][1])){
        		return $match[0][0];
        			
    		}else if(empty($match[0][2])){
        		return $match[0][0].$match[0][1];
    		}else if(!empty($match[0][1]) && !empty($match[0][2])){
				$city1 = $match[0][1];
				$city1 = iconv('GB2312', 'UTF-8', $city1);
				$city2 = $match[0][2];
				$city2 = iconv('GB2312', 'UTF-8', $city2);
				if($city1=='北京' || $city1=='天津' || $city1=='上海' || $city1=='重庆'){
					$city = $city1.'市';
					return $city;
				}else{
					return $city1.'省'.$city2.'市';
				}				
    		}else{
    			return FALSE;
    		}
		}else{
			return FALSE;
		}	
	}
	
	/**
	 * 
	 * 获取新浪接口
	 * @param String $ip
	 */
	function get_sina_ip_to_area($ip){
		$url = "http://int.dpool.sina.com.cn/iplookup/iplookup.php?ip=".$ip;
		$ip = file_get_contents($url);
		if(preg_match_all("/[".chr(0xa1)."-".chr(0xff)."]+/",$ip,$match)){
			if(empty($match[0][1])){
        		return mb_convert_encoding($match[0][0], 'UTF-8', 'GBK');
        			
    		}else if(empty($match[0][2])){
        		return mb_convert_encoding($match[0][0], 'UTF-8', 'GBK').mb_convert_encoding($match[0][1], 'UTF-8', 'GBK');
    		}else if(!empty($match[0][1]) && !empty($match[0][2])){
				$city1 = mb_convert_encoding($match[0][1], 'UTF-8', 'GBK');
				$city2 = mb_convert_encoding($match[0][2], 'UTF-8', 'GBK');
				if($city1=='北京' || $city1=='天津' || $city1=='上海' || $city1=='重庆'){
					$city = $city1.'市';
					echo $city;
				}else{
					echo $city1.'省'.$city2.'市';
				}				
    		}else{
    			return FALSE;
    		}
		}else{
			return FALSE;
		}
	}
