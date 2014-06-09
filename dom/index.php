<?php
// example of how to use basic selector to retrieve HTML contents
include('./simple_html_dom.php');
 
// get DOM from URL or file
$html = file_get_html("http://sy.tertw.net/getMember/username/lcncn.html");

echo $html->find('ul.u',0)->find('li',1)->find('span',0)->find('b',0)->plaintext;
// $code=$html->find('ul.u',1)->find('li',1)->innertext;
// echo $html->find('.r-c ul',0)->find('li',0)->find('font',0)->plaintext;
