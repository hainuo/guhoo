<?php
namespace Org\Util;
class time
{
    public static $define_list = array();
    public static $timestamp, $todayStart, $todayEnd, $timeOffset;
    private static $timeStart = array();
    public static function initialize()
    {
//        self::$timeOffset = qscms::getCfgPath('/system/TIME_ZONE');
        self::$define_list['TIME_ZONE'] = 'Etc/GMT-8';
        self::$define_list['SECOND'] = 1;
        self::$define_list['MINUTE'] = self::$define_list['SECOND'] * 60;
        self::$define_list['HOUR'] = self::$define_list['MINUTE'] * 60;
        self::$define_list['DAY'] = self::$define_list['HOUR'] * 24;
        self::$define_list['WEEK'] = self::$define_list['DAY'] * 7;
        if (function_exists('date_default_timezone_get') && function_exists('date_default_timezone_set')) {
            if (date_default_timezone_get() != self::$define_list['TIME_ZONE']) {
                date_default_timezone_set(self::$define_list['TIME_ZONE']);
            }
        }
        self::$timestamp = time();
        $today = self::todayInfo();
        self::$todayStart = $today['start'];
        self::$todayEnd = $today['end'];
    }
    public static function todayInfo($time = 0)
    {
        $time || ($time = self::$timestamp);
        $todayStart = $time - ($time + self::$timeOffset * self::$define_list['HOUR']) % self::$define_list['DAY'];
        $todayEnd = ($todayStart + self::$define_list['DAY']) - 1;
        return array('start' => $todayStart, 'end' => $todayEnd);
    }
    public static function tshInfo($time = 0)
    {
        $time || ($time = self::$timestamp);
        $start = $time - ($time + self::$timeOffset * self::$define_list['HOUR']) % self::$define_list['HOUR'];
        $end = ($start + self::$define_list['HOUR']) - 1;
        return array('start' => $start, 'end' => $end);
    }
    public static function tsmInfo($time = 0)
    {
        $time || ($time = self::$timestamp);
        $start = $time - ($time + self::$timeOffset * self::$define_list['HOUR']) % self::$define_list['MINUTE'];
        $end = ($start + self::$define_list['MINUTE']) - 1;
        return array('start' => $start, 'end' => $end);
    }
    public static function tswkInfo($time = 0)
    {
        $time || ($time = self::$timestamp);
        $start = $time - (($time + self::$timeOffset * self::$define_list['HOUR']) + 3 * self::$define_list['DAY']) % self::$define_list['WEEK'];
        $end = ($start + self::$define_list['WEEK']) - 1;
        return array('start' => $start, 'end' => $end);
    }
    public static function isEvening()
    {
        $t = self::$timestamp;
        $t = ($t + self::$timeOffset * self::$define_list['HOUR']) % self::$define_list['DAY'];
        if ($t >= 19 * self::$define_list['HOUR'] || $t < 5 * self::$define_list['HOUR']) {
            return true;
        }
        return false;
    }
    private static function formatTime($time)
    {
        ($time = (int) $time) || ($time = time());
        return $time;
    }
    public static function formatGeneral($time = 0)
    {
        return date('Y-m-d H:i:s', self::formatTime($time));
    }
    public static function formatGeneralChinese($time = 0)
    {
        return date('Y年m月d日 H时i分s秒', self::formatTime($time));
    }
    public static function formatGeneralDate($time = 0)
    {
        return date('Y-m-d', self::formatTime($time));
    }
    public static function formatGeneralDateChinese($time = 0)
    {
        return date('Y年m月d日', self::formatTime($time));
    }
    public static function timeDifference($timestamp1, $timestamp2 = 0)
    {
        $timestamp2 || ($timestamp2 = self::$timestamp);
        $ts = $timestamp2 - $timestamp1;
        if ($ts > (5 * 7) * 86400) {
            return self::formatGeneral($timestamp1);
        } else {
            $day = floor($ts / self::$define_list['DAY']);
            $ts -= $day * self::$define_list['DAY'];
            $hour = floor($ts / self::$define_list['HOUR']);
            $ts -= $hour * self::$define_list['HOUR'];
            $minute = floor($ts / self::$define_list['MINUTE']);
            $ts -= $minute * self::$define_list['MINUTE'];
            $weekday = floor($day / 7);
            if ($weekday > 0) {
                return $weekday . '周前';
            }
            if ($day > 0) {
                return $day . '天前';
            }
            if ($hour > 0) {
                return $hour . '小时前';
            }
            if ($minute > 0) {
                return $minute . '分钟前';
            }
            if ($ts > 0) {
                return $ts . '秒前';
            }
            return '此刻';
        }
    }
    public static function daytime($ts)
    {
        $day = floor($ts / self::$define_list['DAY']);
        $ts -= $day * self::$define_list['DAY'];
        $hour = floor($ts / self::$define_list['HOUR']);
        $ts -= $hour * self::$define_list['HOUR'];
        $minute = floor($ts / self::$define_list['MINUTE']);
        $ts -= $minute * self::$define_list['MINUTE'];
        $weekday = floor($day / 7);
        return array('day' => $day, 'hour' => $hour, 'minute' => $minute, 'second' => $ts, 'weekday' => $weekday);
    }
    public static function millisecond()
    {
        list($millisecond, $second) = explode(' ', microtime());
        return array('millisecond' => (double) $millisecond, 'second' => (double) $second);
    }
    public static function getGeneralTimestamp($date)
    {
        $sp0 = explode(' ', $date);
        $date = $sp0[0];
        $time = isset($sp0[1]) ? $sp0[1] : '';
        if ($time) {
            $sp0 = explode(':', $time);
        } else {
            $sp0 = array(0, 0, 0);
        }
        $sp = explode('-', $date);
        empty($sp0[1]) && ($sp0[1] = 0);
        empty($sp0[2]) && ($sp0[2] = 0);
        return mktime((int) $sp0[0], (int) $sp0[1], (int) $sp0[2], (int) $sp[1], (int) $sp[2], (int) $sp[0]);
    }
    public static function timerStart()
    {
        self::$timeStart = self::millisecond();
    }
    public static function timerEnd($export = false)
    {
        $millisecond = self::millisecond();
        $second = $millisecond['second'] - self::$timeStart['second'];
        $millisecond = $millisecond['millisecond'] - self::$timeStart['millisecond'];
        if ($export) {
            echo $second + $millisecond;
        } else {
            return $second + $millisecond;
        }
    }
    public static function isRunNian($year)
    {
        if ($year % 400 == 0 || $year % 4 == 0 && $year % 100 != 0) {
            return true;
        }
        return false;
    }
    public static function tswk()
    {
        $w = (int) date('w', self::$todayStart);
        $w == 0 && ($w = 7);
        $d1 = $w - 1;
        $d2 = 7 - $w;
        $t1 = self::$todayStart - self::$define_list['DAY'] * $d1;
        $t2 = self::$todayEnd + self::$define_list['DAY'] * $d2;
        return array('start' => $t1, 'end' => $t2);
    }
    public static function tsm()
    {
        @(list($y, $m, $d) = explode(',', date('Y,n,j', self::$todayStart)));
        $y = (int) $y;
        $m = (int) $m;
        $d = (int) $d;
        if ($m == 2) {
            if (self::isRunNian($y)) {
                $maxDay = 29;
            } else {
                $maxDay = 28;
            }
        } elseif (in_array($m, array(1, 3, 5, 7, 8, 10, 12))) {
            $maxDay = 31;
        } else {
            $maxDay = 30;
        }
        $d1 = $d - 1;
        $d2 = $maxDay - $d;
        $t1 = self::$todayStart - self::$define_list['DAY'] * $d1;
        $t2 = self::$todayEnd + self::$define_list['DAY'] * $d2;
        return array('start' => $t1, 'end' => $t2);
    }
    public static function days($t)
    {
        if ($t < 0) {
            return 0;
        }
        $t /= 86400;
        $t *= 10;
        $t = floor(($t + 0.5)) / 10;
        return sprintf('%0.1f', $t);
    }
    public static function hours($t)
    {
        if ($t < 0) {
            return 0;
        }
        $t /= 3600;
        $t *= 10;
        $t = floor(($t + 0.5)) / 10;
        return sprintf('%0.1f', $t);
    }
    public static function minutes($t)
    {
        if ($t < 0) {
            return 0;
        }
        $t /= 60;
        $t *= 10;
        $t = floor(($t + 0.5)) / 10;
        return sprintf('%0.1f', $t);
    }
    public static function times($time)
    {
        $arr = self::daytime($time);
        $rs = '';
        $arr['day'] && ($rs .= $arr['day'] . '天');
        $arr['hour'] && ($rs .= $arr['hour'] . '小时');
        $arr['minute'] && ($rs .= $arr['minute'] . '分钟');
        $arr['second'] && ($rs .= $arr['second'] . '秒');
        return $rs;
    }
    public static function addMonth($time)
    {
        @(list($y, $m, $d) = explode(',', date('Y,n,j', $time)));
        $y = intval($y);
        $m = intval($m);
        $d = intval($d);
        if ($m == 2) {
            if (self::isRunNian($y)) {
                $maxDay = 29;
            } else {
                $maxDay = 28;
            }
        } elseif (in_array($m, array(1, 3, 5, 7, 8, 10, 12))) {
            $maxDay = 31;
        } else {
            $maxDay = 30;
        }
        return $time + $maxDay * self::$define_list['DAY'];
    }
    public static function minusMonth($time)
    {
        @(list($y, $m, $d) = explode(',', date('Y,n,j', $time)));
        $y = intval($y);
        $m = intval($m);
        $d = intval($d);
        $m -= 1;
        $m == 0 && ($m = 12);
        if ($m == 2) {
            if (self::isRunNian($y)) {
                $maxDay = 29;
            } else {
                $maxDay = 28;
            }
        } elseif (in_array($m, array(1, 3, 5, 7, 8, 10, 12))) {
            $maxDay = 31;
        } else {
            $maxDay = 30;
        }
        return $time - $maxDay * self::$define_list['DAY'];
    }
}
time::initialize();