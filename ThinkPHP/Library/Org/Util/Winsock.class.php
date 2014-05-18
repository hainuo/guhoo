<?php
namespace Org\Util;
class Winsock{
public static $gzip = true;
public static function isIp($ipStr){
return preg_match('/^\d{1,3}(?:\.\d{1,3}){3}$/',$ipStr) >0?true:false;
}
public static function args($args){
$rn = '';
if(is_array($args)&&count($args)>0){
foreach($args as $k=>$v){
$rn.="$k: $v\r\n";
}
}
return $rn;
}
public static function parseUrl($url){
if(strpos($url,'://')===false)$url = 'http://'.$url;
$urlInfo = parse_url($url);
$urlInfo['scheme'] = strtolower($urlInfo['scheme']);
!$urlInfo['path'] &&$urlInfo['path'] = '/';
empty($urlInfo['port']) &&$urlInfo['port'] = ($urlInfo['scheme'] == 'https'?'443':'80');
!empty($urlInfo['query']) &&$urlInfo['path'] .='?'.$urlInfo['query'];
return $urlInfo;
}
private static function parseHead($head){
$rn = $httpInfo = $args = array();
$sp = explode("\r\n",$head);
$sp2 = explode(' ',$sp[0]);
$httpInfo['version'] = substr($sp2[0],5);
array_shift($sp2);
$httpInfo['statusNum']  = $sp2[0];
$httpInfo['statusNum1'] = substr($sp2[0],0,1);
$httpInfo['status']     = $httpInfo['statusNum1'] == '2';
array_shift($sp2);
$httpInfo['info']   = implode('',$sp2);
array_shift($sp);
foreach($sp as $v){
$f = strpos ( $v,':');
if ($f>0) {
$key = trim(substr ($v,0,$f));
$val = trim(substr($v,$f +1));
$args[$key][] = $val;
}
}
$rn['info'] = $httpInfo;
$rn['args'] = $args;
return $rn;
}
public static function getHead($url,$args = array()){
$ln = chr(13).chr(10);
$head = array();
if($urlInfo = self::parseUrl($url)){
if (!self::isIp($urlInfo['host'])) {
$urlInfo['ip'] = gethostbyname($urlInfo['host']);
$urlInfo['ip'] == $urlInfo['host'] &&$urlInfo['ip'] = '';
$urlInfo['ip'] ||$urlInfo['ip'] = $urlInfo['host'];
}else {
$urlInfo['ip'] = $urlInfo['host'];
}
if ($urlInfo['ip']) {
$chunked = $gzip = false;
$rsize = 1024;
$headStr = '';
if (!$args['Accept-Encoding'] &&ZLIB === true &&self::$gzip)$args['Accept-Encoding'] = 'gzip';
$f = @_fsockopen(($urlInfo['scheme'] == 'https'?'ssl://':'').$urlInfo['ip'],$urlInfo['port'],$errno,$errstr,30);
if($f){
$out = 'HEAD '.$urlInfo['path'].' HTTP/1.1'.$ln;
$out.= 'Host: '.$urlInfo['host'].$ln;
$out.= self::args($args);
$out.='Connection: Close'.$ln;
$out.=$ln;
fwrite($f,$out);
while($r = fread($f,$rsize)){
$headStr .= $r;
}
fclose($f);
$head = self::parseHead($headStr);
}
}
}
return $head;
}
public static function open($url,$postFlag = false,$args=array(),$full=false,$head_append=true,$saveFile=''){
$ln = chr(13).chr(10);
if($urlInfo = self::parseUrl($url)){
if (!self::isIp($urlInfo['host'])) {
$urlInfo['ip'] = gethostbyname($urlInfo['host']);
$urlInfo['ip'] == $urlInfo['host'] &&$urlInfo['ip'] = '';
}else {
$urlInfo['ip'] = $urlInfo['host'];
}
if ($urlInfo['ip']) {
$headStr = '';
$head = array();
$getHead=false;
$chunked = $gzip = false;
$chunksize = 0;
$readSize = 0;
$rsize = 1024;
$thisSize=0;
$contentLength = 0;
$leaveSize = 0;
$html = '';
if (empty($args['Accept-Encoding']) &&ZLIB===true &&self::$gzip)$args['Accept-Encoding'] = 'gzip';
$save = false;
if($saveFile &&($saveF = @fopen($saveFile,'wb'))) $save = true;
$f = @_fsockopen(($urlInfo['scheme'] == 'https'?'ssl://':'').$urlInfo['ip'],$urlInfo['port'],$errno,$errstr,50);
if($f){
$out = '';
$out = ($postFlag?'POST':'GET').' '.$urlInfo['path'].' HTTP/1.1'.$ln;
$out.= 'Host: '.$urlInfo['host'].$ln;
$out.= self::args($args);
if($postFlag){
if (!is_array($postFlag)) {
$postFlag = array(
'type'=>'text',
'data'=>$postFlag
);
}
$postLength = 0;
switch ($postFlag['type']) {
case 'file':
$postLength = filesize($postFlag['data']);
$out.='Content-Type: multipart/form-data; boundary=---------------------------7dc2ce5b0ace'.$ln;
break;
default:
$out.='Content-Type: application/x-www-form-urlencoded'.$ln;
$postLength = strlen($postFlag['data']);
break;
}
}
fwrite($f,$out);
if ($postFlag) {
switch ($postFlag['type']) {
case 'file':
$postDataPrefix = '-----------------------------7dc2ce5b0ace
Content-Disposition: form-data; name="'.$postFlag['varName'].'"; filename="'.$postFlag['data'].'"
Content-Type: application/octet-stream

';
$postDataSuffix = '
-----------------------------7dc2ce5b0ace--
';
$postLength += strlen($postDataPrefix);
$postLength += strlen($postDataSuffix);
fwrite($f,'Content-Length: '.$postLength.$ln);
fwrite($f,'Connection: Close'.$ln);
fwrite($f,$ln);
fwrite($f,$postDataPrefix);
if ($__f = fopen($postFlag['data'],'rb')) {
while ($__r = fread($__f,1024 * 100)) {
fwrite($f,$__r);
}
fclose($__f);
}
fwrite($f,$postDataSuffix);
break;
default:
fwrite($f,'Content-Length: '.$postLength.$ln);
fwrite($f,'Connection: Close'.$ln);
fwrite($f,$ln);
fwrite($f,$postFlag['data']);
break;
}
}else {
fwrite($f,'Connection: Close'.$ln);
fwrite($f,$ln);
}
while(is_resource($f) &&($r = fread($f,$rsize)) ){
$thisSize = strlen($r);
if(!$getHead){
if(($fa=strpos($r,$ln.$ln))===false)$headStr.=$r;
else {
$headStr.=substr($r,0,$fa);
$head = self::parseHead($headStr);
if($head['info']['status']){
isset($head['args']['Content-Length']) &&$contentLength = intval($head['args']['Content-Length'][0]);
if(!empty($head['args']['Content-Encoding']) &&$head['args']['Content-Encoding'][0] == 'gzip'&&ZLIB === true)$gzip = true;
if(!empty($head['args']['Transfer-Encoding']) &&$head['args']['Transfer-Encoding'][0] == 'chunked'){
$chunked = true;
$html    = substr($r,$fa+4);
$readSize += $thisSize -$fa -4;
if ($contentLength) {
$leaveSize = $contentLength -$readSize;
if ($leaveSize == 0) fclose($f);
else $leaveSize <$rsize &&$rsize = $leaveSize;
}
}else {
if($save)fwrite($saveF,substr($r,$fa+4));
else $html=substr($r,$fa+4);
$readSize += $thisSize -$fa -4;
if ($contentLength) {
$leaveSize = $contentLength -$readSize;
if ($leaveSize == 0) fclose($f);
else $leaveSize <$rsize &&$rsize = $leaveSize;
}
}
$getHead=true;
}else {
$html = substr($r,$fa+4);
$readSize += $thisSize -$fa -4;
break;
}
}
}else {
if($save &&!$chunked &&!$gzip)fwrite($saveF,$r);
else $html.=$r;
$readSize += $thisSize;
if ($contentLength) {
$leaveSize = $contentLength -$readSize;
if ($leaveSize == 0) fclose($f);
else $leaveSize <$rsize &&$rsize = $leaveSize;
}
}
}
is_resource($f) &&fclose($f);
if($chunked){
$fa=strpos($html,"\r\n");
$last_fa=0;
$rn = '';
while($fa!==false){
$chunksize=hexdec(substr($html,$last_fa,$fa-$last_fa));
if($chunksize==0)break;
$fa+=2;
$rn.=substr($html,$fa,$chunksize);
$last_fa=$fa+2+$chunksize;
$fa=strpos($html,"\r\n",$last_fa);
}
$html=$rn;
unset($rn);
if($save &&!$gzip){
fwrite($saveF,$html);
}
}
if ($gzip) {
$html = gzdecode($html);
if($save)fwrite($saveF,$html);
}
if($save){
fclose($saveF);
return true;
}else {
if($full){
if($head_append)return $headStr."\r\n\r\n".$html;
else return array('head'=>$head,'data'=>$html);
}
return $html;
}
}
}
}
}
public static function open_html($url,$postFlag =  false,$args=array(),$return_encoding=ENCODING){
if($rs=self::open($url,$postFlag,$args,true,false)){
$head = $rs['head'];
$data = $rs['data'];
unset($rs);
if (empty($head['info'])) return false;
switch($head['info']['statusNum1']){
case '2':
$encoding='';
if(!empty($head['args']['Content-Type'])){
if(preg_match('/charset=(.+)/',$head['args']['Content-Type'][0],$matches)){
$encoding = $matches[1];
}
}
if(!$encoding){
if(preg_match('/<meta.*?http-equiv="Content-Type".*content=.*?charset=(.+)>/i',$data,$matches)){
$encoding = $matches[1];
$sp = preg_split('/\'|"/',$encoding);
$encoding = trim($sp[0]);
}
}
$encoding ||$encoding=$return_encoding;
return iconv($encoding,$return_encoding."//IGNORE",$data);
break;
case '3':
$goto_url = $head['args']['Location'][0];
$info0 = parse_url($goto_url);
if(!$info0['scheme']){
$info1 = parse_url($url);
if(substr($goto_url,0,1)=='/')$goto_url=$info1['scheme'].'://'.$info1['host'].$goto_url;
else {
!$info1['path'] &&$info1['path']='/';
$path=$info1['path'];
if(substr($path,-1,1)=='/')$goto_url=$path.$goto_url;
else $goto_url=substr($path,0,strrpos($path,'/')).'/'.$goto_url;
$goto_url=$info1['scheme'].'://'.$info1['host'].$goto_url;
}
}
if($goto_url){
return self::get_html($goto_url);
}else return '';
break;
case '4':
return false;
break;
}
}
}
public static function get_html($url,$args=array(),$return_encoding=ENCODING){
return self::open_html($url,'',$args,$return_encoding);
}
public static function post_html($url,$postFlag,$args = array(),$return_encoding = ENCODING){
return self::open_html($url,$postFlag,$args,$return_encoding);
}
public static function get($url,$args=array(),$full=false,$head_append=true){
return self::open($url,'',$args,$full,$head_append);
}
public static function post($url,$data,$args=array(),$full=false,$head_append=true){
return self::open($url,$data,$args,$full,$head_append);
}
public static function download($url,$save,$args=array()){
return self::open($url,'',$args,false,true,$save);
}
public static function uploadFile($url,$varName,$file){
if (file_exists($file)) {
return winsock::open($url,array('type'=>'file','varName'=>$varName,'data'=>$file));
}
return false;
}
}