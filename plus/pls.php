<?php
/**
 *
 * 评论次数统计
 *
 *
 */
require_once(dirname(__FILE__)."/../include/common.inc.php");
$aid = (isset($aid) && is_numeric($aid)) ? $aid : 0;
$row = $dsql->GetOne("SELECT count(id) AS c FROM `dede_feedback` WHERE aid='$aid' ");

echo 'document.getElementById("commentnum").innerHTML='.$row['c'];
exit();