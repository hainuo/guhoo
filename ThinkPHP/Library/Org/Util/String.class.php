<?php
namespace Org\Util;
class string
{
    public static function save_define($arr, $path, $isStr = false)
    {
        if (is_array($arr)) {
            $define_str = '<?php';
            foreach ($arr as $k => $v) {
                $tmp = $v;
                if (!$isStr) {
                    if ((!is_numeric($tmp) && $tmp != 'true') && $tmp != 'false') {
                        $tmp = ('\'' . $tmp) . '\'';
                    }
                } else {
                    $tmp = ('\'' . $tmp) . '\'';
                }
                $define_str .= "\ndefine('{$k}',{$tmp});";
            }
            $define_str .= '
?>';
            savefile($path, $define_str);
        }
    }
    public static function parse_define($path)
    {
        if (file_exists($path)) {
            $data = bf_readfile($path);
            if (preg_match_all('/define\\((.+?),(.+?)\\);/', $data, $matches, PREG_SET_ORDER)) {
                foreach ($matches as $v) {
                    $bk_k = $v[1];
                    $bk_v = $v[2];
                    $bk_k = trim($bk_k);
                    $bk_k = trim($bk_k, '\'');
                    $bk_k = trim($bk_k, '"');
                    $bk_v = trim($bk_v);
                    $bk_v = trim($bk_v, '\'');
                    $bk_v = trim($bk_v, '"');
                    $rn[$bk_k] = $bk_v;
                }
                return $rn;
            }
        }
    }
    public static function formatArray($arr)
    {
        $rn = '';
        switch (gettype($arr)) {
        case 'boolean':
            return $arr ? 'true' : 'false';
            break;
        case 'integer':
            return $arr;
            break;
        case 'double':
            return $arr;
            break;
        case 'string':
            return ('\'' . addcslashes($arr, '\'\\')) . '\'';
            break;
        case 'array':
            foreach ($arr as $k => $v) {
                $rn && ($rn .= ',');
                switch (gettype($k)) {
                case 'boolean':
                    $k = $k ? 'true' : 'false';
                    break;
                case 'string':
                    $k = ('\'' . addcslashes($k, '\'\\')) . '\'';
                    break;
                }
                $rn .= ($k . '=>') . self::formatArray($v);
            }
            return "array({$rn})";
            break;
        case 'object':
            return '\'\'';
            break;
        case 'resource':
            return '\'\'';
            break;
        case 'NULL':
            return '\'\'';
            break;
        case 'user function':
            return '\'\'';
            break;
        case 'unknown type':
            return '\'\'';
            break;
        }
    }
    public static function show_message($message)
    {
        
    }
    public static function str_hex($str)
    {
        $len = strlen($str);
        $ord = 0;
        $hex = '';
        $a = ($b = 0);
        for ($i = 0; $i < $len; $i++) {
            $ord = ord(substr($str, $i, 1));
            $b = $ord % 16;
            $a = ($ord - $b) / 16;
            $a > 9 && ($a = chr((97 + $a) - 10)) || ($a = chr(48 + $a));
            $b > 9 && ($b = chr((97 + $b) - 10)) || ($b = chr(48 + $b));
            $hex .= $a . $b;
        }
        return $hex;
    }
    public static function hex_str($hex)
    {
        $len = strlen($hex);
        $a = ($b = 0);
        $str = '';
        for ($i = 0; $i < $len; $i += 2) {
            $a = ord(substr($hex, $i, 1));
            $b = ord(substr($hex, $i + 1, 1));
            $a >= 97 && ($a = ($a - 97) + 10) || ($a -= 48);
            $b >= 97 && ($b = ($b - 97) + 10) || ($b -= 48);
            $str .= chr($a * 16 + $b);
        }
        return $str;
    }
    public static function get_object_vars_final($obj)
    {
        if (is_object($obj)) {
            $obj = get_object_vars($obj);
        }
        if (is_array($obj)) {
            foreach ($obj as $key => $value) {
                $obj[$key] = self::get_object_vars_final($value);
            }
        }
        return $obj;
    }
    public static function json_encode($arr)
    {
        if (function_exists('json_encode')) {
            return json_encode($arr);
        } else {
            static $json;
            isset($json) || ($json = new MY_JSON());
            return $json->encode($arr);
        }
    }
    public static function json_decode($str)
    {
        $arr = array();
        if (function_exists('json_decode')) {
            $arr = json_decode($str, true);
        }
        if (!$arr) {
            static $json;
            isset($json) || ($json = new MY_JSON());
            $arr = $json->decode($str);
        }
        return $arr;
    }
    public static function ubbDecode($str)
    {
        loadFunc('ubb2html');
        return ubb2html($str);
    }
    public static function getUBBPic($id)
    {
        global $weburl2;
        if ($line = db::one('pics', '*', "id='{$id}'")) {
            return ((((((((('<a href="' . $weburl2) . 'item/') . $id) . '"><img width="400" src="') . $weburl2) . $line['path']) . $line['name']) . '_big.') . $line['suffix']) . '" /></a>';
        }
        return '';
    }
    public static function getUBBAlbum($id)
    {
        global $weburl2;
        if ($line = db::one('albums', '*', "id='{$id}'")) {
            return (((((((('<div style="text-align:center"><a href="' . $weburl2) . 'album/') . $id) . '"><img src="') . $weburl2) . $line['avatar']) . '"><span>专辑：') . $line['name']) . '</span></a></div>';
        }
        return '';
    }
    public static function getUBB($str)
    {
        $str = preg_replace('/\\[item\\](\\d+)\\[\\/item\\]/e', 'self::getUBBPic($1)', $str);
        $str = preg_replace('/\\[bold\\](.*?)\\[\\/bold\\]/s', '<b>$1</b>', $str);
        $str = preg_replace('/\\[album\\](\\d+)\\[\\/album\\]/e', 'self::getUBBAlbum($1)', $str);
        $str = str_replace('
', '
', $str);
        $str = nl2br($str);
        return $str;
    }

    public static function getXin($str, $start = 0, $len = -1)
    {
        $strLen = mb_strlen($str);
        if ($start >= 0 && $start <= $strLen - 1) {
            $len == -1 && ($len = $strLen - $start);
            $len + $start > $strLen && ($len = $strLen - $start);
            $rn = '';
            $rn .= mb_substr($str, 0, $start);
            $rn .= str_repeat('*', $len);
            $rn .= mb_substr($str, $start + $len);
            return $rn;
        }
        return str_repeat('*', $strLen);
    }
    public static function getXin2($str)
    {
        $strLen = mb_strlen($str);
        if ($strLen >= 3) {
            return self::getXin($str, 1, $strLen - 2);
        }
        return $str;
    }
    public static function getXin3($str, $len = 1)
    {
        $strLen = mb_strlen($str);
        $_l = $len;
        while ($strLen - $_l * 2 <= 0 && $_l > 0) {
            $_l--;
        }
        if ($_l > 0) {
            return self::getXin($str, $_l, $strLen - $_l * 2);
        }
        return $str;
    }
    public static function getStaticCode($arr)
    {
        $str = '';
        foreach ($arr as $k => $v) {
            $var = ('$' . $k) . '=';
            switch (gettype($v)) {
            case 'boolean':
                $var .= $v ? 'true' : 'false';
                break;
            case 'integer':
                $var .= $v;
                break;
            case 'double':
                $var .= $v;
                break;
            case 'string':
                $var .= ('\'' . addcslashes($v, '\'\\')) . '\'';
                break;
            case 'array':
                $var .= self::formatArray($v);
                break;
            case 'object':
                $var .= '\'\'';
                break;
            case 'resource':
                $var .= '\'\'';
                break;
            case 'NULL':
                $var .= '\'\'';
                break;
            case 'user function':
                $var .= '\'\'';
                break;
            case 'unknown type':
                $var .= '\'\'';
                break;
            }
            $var .= ';';
            $str .= $var;
        }
        $str = ('<?php ' . $str) . '?>';
        return $str;
    }
    public static function setColors($string, $keys, $color)
    {
        foreach ($keys as $key) {
            $string = str_replace($key, ((('<span style="color:' . $color) . '">') . $key) . '</span>', $string);
        }
        return $string;
    }
    public static function getRandStr($len = 4, $type = 7)
    {
        $return = '';
        $set_C_list = array();
        $type & 1 && ($set_C_list[] = 1);
        $type & 2 && ($set_C_list[] = 2);
        $type & 4 && ($set_C_list[] = 3);
        $set_C = count($set_C_list);
        $set_C > 0 && $set_C--;
        for ($i = 0; $i < $len; $i++) {
            switch ($set_C_list[mt_rand(0, $set_C)]) {
            case 1:
                $return .= chr(mt_rand(48, 57));
                break;
            case 2:
                $return .= chr(mt_rand(65, 90));
                break;
            case 3:
                $return .= chr(mt_rand(97, 122));
                break;
            }
        }
        return $return;
    }
    public static function dg_string($data, $flagA, $flagB, $start = 0)
    {
        $flagAL = strlen($flagA);
        $flagBL = strlen($flagB);
        $rn = '';
        $a = ($b = 0);
        //trace('截取开始');
        if (($findA = strpos($data, $flagA, $start)) !== false) {
            $a = 1;
            $tmpA = $findA;
            $findB = $findA + $flagAL;
            $findA = $findB;
//            trace('成功进入');
            while ($a != $b) {
                if (($findB = strpos($data, $flagB, $findB)) !== false) {
                    $b++;
                    if (($findA = strpos($data, $flagA, $findA)) !== false) {
                        if ($findA > $findB) {
                            if ($a == $b) {
                                $findB += $flagBL;
                                $rn = substr($data, $tmpA, $findB - $tmpA);
                            } else {
                                $a++;
                                $findB = $findA + $flagAL;
                                $findA = $findB;
                            }
                        } else {
                            $a++;
                            $findA += $flagAL;
                            $findB += $flagBL;
                        }
                    } else {
                        if ($a == $b) {
                            $findB += $flagBL;
                            $rn = substr($data, $tmpA, $findB - $tmpA);
                        } else {
                            $findB += $flagBL;
                        }
                    }
                } else {
                    $rn = substr($data, $tmpA);
                    $rn .= str_repeat($flagB, $a - $b);
                    break;
                }
            }
        }
        return $rn;
    }
    public static function dg_string2($data, $flag, $start)
    {
        
        $flagA = '<' . $flag;
        $flagB = ('</' . $flag) . '>';
        $flagAL = strlen($flagA);
        $flagBL = strlen($flagB);
        $rn = '';
        $a = ($b = 0);
        if (($findA = strpos($data, $start)) !== false) {
            $a = 1;
            $tmpA = $findA;
            $findB = $findA + $flagAL;
            $findA = $findB;
            while ($a != $b) {
                if (($findB = strpos($data, $flagB, $findB)) !== false) {
                    $b++;
                    if (($findA = strpos($data, $flagA, $findA)) !== false) {
                        if ($findA > $findB) {
                            if ($a == $b) {
                                $findB += $flagBL;
                                $rn = substr($data, $tmpA, $findB - $tmpA);
                            } else {
                                $a++;
                                $findB = $findA + $flagAL;
                                $findA = $findB;
                            }
                        } else {
                            $a++;
                            $findA += $flagAL;
                            $findB += $flagBL;
                        }
                    } else {
                        if ($a == $b) {
                            $findB += $flagBL;
                            $rn = substr($data, $tmpA, $findB - $tmpA);
                        } else {
                            $findB += $flagBL;
                        }
                    }
                } else {
                    $rn = substr($data, $tmpA);
                    $rn .= str_repeat($flagB, $a - $b);
                    break;
                }
            }
        }
        return $rn;
    }
    public static function formatAlert($str)
    {
        $str = str_replace('"', '\\x22', $str);
        $str = str_replace('\'', '\\x27', $str);
        $str = str_replace('', '', $str);
        $str = str_replace('', '\\n', $str);
        return $str;
    }
    public static function getXmlData($strXml)
    {
        $pos = strpos($strXml, 'xml');
        if ($pos) {
            $xmlCode = simplexml_load_string($strXml, 'SimpleXMLElement', LIBXML_NOCDATA);
            $arrayCode = self::get_object_vars_final($xmlCode);
            return $arrayCode;
        } else {
            return '';
        }
    }
    public static function get_html($action)
    {
        extract($GLOBALS, EXTR_SKIP);
        $html0 = ob_get_contents();
        qscms::ob_clean();
        @include d((('./lib/' . $action) . '.php'));
        $html = ob_get_contents();
        qscms::ob_clean();
        echo $html0;
        return $html;
    }
    public static function cuthtml($body, $size)
    {
        $_size = mb_strlen($body);
        if ($_size <= $size) {
            return $body;
        }
        $strlen_var = strlen($body);
        if (strpos($body, '<') === false) {
            return mb_substr($body, 0, $size);
        }
        if ($e = strpos($body, '<!-- break -->')) {
            return mb_substr($body, 0, $e);
        }
        $html_tag = 0;
        $summary_string = '';
        $html_array = array('left' => array(), 'right' => array());
        for ($i = 0; $i < $strlen_var; ++$i) {
            if (!$size) {
                break;
            }
            $current_var = substr($body, $i, 1);
            if ($current_var == '<') {
                $html_tag = 1;
                $html_array_str = '';
            } else {
                if ($html_tag == 1) {
                    if ($current_var == '>') {
                        $html_array_str = trim($html_array_str);
                        if (substr($html_array_str, -1) != '/') {
                            $f = substr($html_array_str, 0, 1);
                            if ($f == '/') {
                                $html_array['right'][] = str_replace('/', '', $html_array_str);
                            } else {
                                if ($f != '?') {
                                    if (strpos($html_array_str, ' ') !== false) {
                                        $html_array['left'][] = strtolower(current(explode(' ', $html_array_str, 2)));
                                    } else {
                                        $html_array['left'][] = strtolower($html_array_str);
                                    }
                                }
                            }
                        }
                        $html_array_str = '';
                        $html_tag = 0;
                    } else {
                        $html_array_str .= $current_var;
                    }
                } else {
                    --$size;
                }
            }
            $ord_var_c = ord($body[$i]);
            switch (true) {
            case ($ord_var_c & 224) == 192:
                $summary_string .= substr($body, $i, 2);
                $i += 1;
                break;
            case ($ord_var_c & 240) == 224:
                $summary_string .= substr($body, $i, 3);
                $i += 2;
                break;
            case ($ord_var_c & 248) == 240:
                $summary_string .= substr($body, $i, 4);
                $i += 3;
                break;
            case ($ord_var_c & 252) == 248:
                $summary_string .= substr($body, $i, 5);
                $i += 4;
                break;
            case ($ord_var_c & 254) == 252:
                $summary_string .= substr($body, $i, 6);
                $i += 5;
                break;
            default:
                $summary_string .= $current_var;
            }
        }
        if ($html_array['left']) {
            $html_array['left'] = array_reverse($html_array['left']);
            foreach ($html_array['left'] as $index => $tag) {
                $key = array_search($tag, $html_array['right']);
                if ($key !== false) {
                    unset($html_array['right'][$key]);
                } else {
                    $summary_string .= ('</' . $tag) . '>';
                }
            }
        }
        return $summary_string;
    }
    public static function formatSize($size)
    {
        if ($size < 1024) {
            $sizeStr = $size . 'Byte';
        } elseif ($size < 1024 * 1024) {
            $sizeStr = floor((($size / 1024) * 10 + 0.5)) / 10 . 'KB';
        } elseif ($size < (1024 * 1024) * 1024) {
            $sizeStr = floor(((($size / 1024) / 1024) * 10 + 0.5)) / 10 . 'MB';
        } else {
            $sizeStr = floor((((($size / 1024) / 1024) / 1024) * 10 + 0.5)) / 10 . 'GB';
        }
        return $sizeStr;
    }
    public static function parseChoose($str)
    {
        $sp = qscms::trimExplode('
', $str);
        $list = array();
        foreach ($sp as $v) {
            if ($v) {
                $sp1 = qscms::trimExplode('=', $v);
                $list[] = array('key' => $sp1[1], 'value' => $sp1[0]);
            }
        }
        return $list;
    }
    public static function getCheckBox($arr)
    {
        $rn = 0;
        if ($arr) {
            qscms::setType($arr, 'int');
            foreach ($arr as $v) {
                $rn |= 1 << $v - 1;
            }
        }
        return $rn;
    }
    public static function getPregVal($pattern, $str, $index = 1)
    {
        if (preg_match($pattern, $str, $matches)) {
            if (isset($matches[$index])) {
                return $matches[$index];
            }
        }
        return '';
    }
    public function  getSubstr($str, $leftStr, $rightStr)
{
    $left = strpos($str, $leftStr);
    //echo '左边:'.$left;
    $right = strpos($str, $rightStr,$left);
    //echo '<br>右边:'.$right;
    if($left < 0 or $right < $left) return '';
    $data= substr($str, $left + strlen($leftStr), $right-$left-strlen($leftStr));
	 $data=preg_replace("/<(\/?.*?)>/si","",$data);
	 return $data;
    }
}