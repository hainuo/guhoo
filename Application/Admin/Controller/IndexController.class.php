<?php
// 本类由系统自动生成，仅供测试用途
namespace Admin\Controller;

use Think\Controller;

class IndexController extends Controller
{
    /**
     * IndexController::index()
     *
     * @return
     */
    public function index()
    {

        if (session('name') && session('logged')) {
            $configModel = D('Config');
            $linkModel = D('Link');
            $userModel = D('Admin');
            $adModel = D('Ad');
            $artModel = D('Article');
            $links = $linkModel->order('id ASC')->select();
            $ads = $adModel->order('id ASC')->select();
            $configs = $configModel->order('id ASC')->select();
            $users = $userModel->order('id ASC')->select();
            $articles = $artModel->order('create_time DESC')->select();
            $config = M('Config')->getField('name,value');
            C($config); //重新加载一遍配置文件
            C('DATA_CATCH_TIME', '1');
            $this->assign('userName', session('name'));
            $this->assign('users', $users);
            $this->assign('ads', $ads);
            $this->assign('articles', $articles);
            $this->assign('links', $links);
            $this->assign('configs', $configs);
            $this->display();

        } else {
            redirect('/Admin/Index/login.html', 3, "没有登录，即将跳转至登录界面");
        }
    }

    public function login()
    {
        $mode = D('Admin');
        if (IS_POST && $mode->autoCheckToken($_POST)) {
            $userName = I('post.userName');
            $password = I('post.password');
            $verifyCode = I('post.verify');
            if ($userName && $password && $this->check_verify($verifyCode)) {
                $result = $mode->where(array('name' => $userName, 'password' => md5($password)))->select();
                if ($result && count($result) == 1) {
                    session('name', $userName);
                    session('password', $password);
                    session('id', session_id());
                    session('logged', true);
                    $this->success('登陆成功', '/Admin/Index/index.html');
                } else {
                    $this->error('验证失败');
                }
            } else {
                $this->error('验证码不正确或者您未填写完整');; //填表项目中有空值则返回
            }
        } else
            $this->display();
    }

    public function linkManage()
    {
        $type = I('post.type');
        if(!$type)$type=I('get.type');
        $linkModel = D('Link');
        $id = I('get.id');
        if(!$id)$id = I('post.id');
        $name = I('get.name');
        if(!$name)$name=I('post.name');
        $url = I('post.url');
        $delImg = I('get.delImg');
        if(!$delImg) $delImg=I('post.delImg');
        if (session('name') && session('logged')) //进行登录判断
            switch ($type) {
                case 'add':
                    if (IS_POST && $linkModel->autoCheckToken($_POST)) {
                        $linkInfo = array('name' => $name, 'url' => $url);
                        if (!empty($_FILES))
                            $info = $this->upload('link');
                        if ($info) {
                            $image = '/Public/Uploads' . $info["savepath"] . $info["savename"];
                            $linkInfo['image'] = $image;
                            \Think\Log::write('上传文件路径' . serialize($linkInfo), 'info');
                            //\Think\Log::write('地址'.__DIR__ . $image.THINK_PATH);
                        }

                        $result = $linkModel->data($linkInfo)->add();
                        if ($info && $result)
                            $this->success('图片上传成功', 'javascript:parent.location.reload();');
                        elseif ($result) {
                            $this->error('你没有选择图片或者图片上传失败,请检查/Public/Uploads/link/是否有写权限', 'javascript:parent.location.reload();');
                        } else
                            $this->error('添加失败', 'javascript:parent.location.reload();');

                    } else
                        $this->display();
                    break;
                case 'del':
                    if ($id) {
                        $info = $linkModel->where('id=' . $id)->find();
                        unlink(WEBROOT . $info['image']);
                        $result = $linkModel->where('id=' . $id)->delete();
                    }
                    if ($result)
                        $this->success('删除成功', 'javascript:parent.location.reload();');
                    else
                        $this->error('删除失败', 'javascript:parent.location.reload();');
                    break;
                case 'change':
                    if (IS_POST && $linkModel->autoCheckToken($_POST)) {
                        $linkInfo = array('name' => $name, 'url' => $url, 'id' => $id);
                        if (!$image) {
                            $data = $linkModel->where('id=' . $id)->find();
                            $image = $data['image'];
                            //\Think\Log::write('地址'.WEBROOT . $image.THINK_PATH);
                        }
                        if ($delImg) {
                            unlink(WEBROOT . $image);
                            $image = '';
                            $linkInfo['image'] = '';
                        }
                        if (!empty($_FILES)) {
                            if ($image)
                                unlink(WEBROOT . $image);
                            $info = $this->upload('link');
                            if (!empty($info)) {
                                $image = '/Public/Uploads' . $info["savepath"] . $info["savename"];
                                //\Think\Log::write('链接修改时，链接'.$id.$name.'上传文件路径'.$image.'\r\s  '.serialize($info));
                            }
                            if ($image)
                                $linkInfo['image'] = $image;
                        } else
                            $info = '';
                        $result = $linkModel->data($linkInfo)->save();
                        if ($result && !empty($info))
                            $this->success('图片修改成功,信息修改成功', 'javascript:parent.location.reload();');
                        elseif ($result && (!empty($_FILES)))
                            $this->success('图片上传失败，其他信息修改成功', 'javascript:parent.location.reload();');
                        elseif ($result && $delImg)
                            $this->error('图片删除成功，其他信息修改成功', 'javascript:parent.location.reload();');
                        else
                            $this->error('图片操作失败，信息修改出错', 'javascript:parent.location.reload();');
                    } else {
                        $data = $linkModel->where('id=' . $id)->find();
                        $this->assign('data', $data);
                        $this->display();
                    }
                    break;
                case 'checkUrl':
                    if (IS_AJAX && !$result = $linkModel->where('url="' . $url . '" and id !=' . $id)->find())
                        echo json_encode(array('ok' => '可以使用',));
                    else
                        echo json_encode(array('error' => '已被使用'));
                    break;

                default:
                    # code...
                    break;
            }
        else
            $this->error('登录超时，请重新登录', 'login.html');

    }

    public function adManage()
    {
        $type = I('get.type');
        if (session('name') && session('logged')) {
            if ($type == 'change') {
                $id = I('get.id');
                $name = I('name');
                $url = I('post.url');
                $delImg = I('delImg');
                $remark = I('remark');
                $adModel = D('Ad');
                $data = $adModel->where('id=' . $id)->find();
                if (IS_POST && $adModel->autoCheckToken($_POST)) {
                    if ($data)
                        $image = $data['image'];
                    else
                        $data = array();
                    $data['id'] = $id;
                    $data['url'] = $url;
                    $data['remark'] = $remark;
                    $data['name'] = $name;
                    if ($delImg && $image) {
                        unlink(WEBROOT . $image);
                        $image = '';
                        $data['image'] = '';
                    }
                    if (!empty($_FILES)) {
                        if ($image)
                            unlink(WEBROOT . $image);
                        $info = $this->upload('ad');
                        if ($info) {
                            $image = '/Public/Uploads' . $info["savepath"] . $info["savename"];
                            $data['image'] = $image;
                        }
                    } else
                        $info = '';
                    //没有图片时，强制定义为空，以便确认返回结果
                    $result = $adModel->data($data)->save();
                    if ($result && (!empty($info)))
                        $this->success('图片修改成功,信息修改成功', 'javascript:parent.location.reload();');
                    elseif ($result && (!empty($_FILES)))
                        $this->success('图片上传失败，其他信息修改成功', 'javascript:parent.location.reload();');
                    elseif ($result && $delImg)
                        $this->error('图片删除成功，其他信息修改成功', 'javascript:parent.location.reload();');
                    else
                        $this->error('图片操作失败，信息修改出错', 'javascript:parent.location.reload();');

                } else {
                    if ($data)
                        $this->assign('data', $data);
                    $this->display();
                }
            } else
                $this->error('操作失败', 'index.html');
        } else
            $this->error('操作失败', 'index.html');
    }

    public function configManage()
    {
        $type = I('get.type');
        $id = I('id');
        //$name=I('name');
        $text = I('text');
        $remark = I('remark');
        $configModel = D('Config');
        if (session('name') && session('logged')) {
            switch ($type) {
                case 'add':
                    $this->error('操作已经禁用', 'javascript:parent.location.reload();');
                    break;
                case 'del':
                    $this->error('操作已经禁用', 'javascript:parent.location.reload();');
                    break;
                case 'change':
                    if (IS_POST && $configModel->autoCheckToken($_POST)) {
                        $configInfo = array('id' => $id, 'value' => $text);
                        $result = $configModel->data($configInfo)->save();
                        if ($result)
                            $this->success('修改成功', 'javascript:parent.location.reload();');
                        else
                            $this->error('操作出错', 'javascript:parent.location.reload();');
                    } else {
                        if ($id) {
                            $data = $configModel->where('id=' . $id)->find();
                            if ($data)
                                $this->assign('data', $data);
                            $this->display();
                        } else
                            $this->error('操作已经禁用', 'javascript:parent.location.reload();');
                    }
                    break;

                default:
                    $this->error('操作已经禁用', 'javascript:parent.location.reload();');
                    break;
            }
        }

    }

    public function userManage()
    {
        $type = I('get.type');
        if($type=='')$type=I('post.type');
        $userModel = D('Admin');
        $userId = I('get.userId');
        if($userId=='')$userId=I('post.userId');

        $userName = I('userName');
        $password = I('post.password');
        $rePassword = I('post.repassword');
        $this->assign('type',$type);
        if (session('name') && session('logged')) //进行登录判断
            switch ($type) {
                case 'add':
                    if (IS_POST && $userModel->autoCheckToken($_POST)) {
                        if ($password == $rePassword) {
                            $result = $userModel->data(array('name' => $userName, 'password' => md5($password)))->add();
                            if ($result)
                                $this->success('添加成功', 'javascript:parent.location.reload();');
                            else
                                $this->error('添加失败，请重新添加');
                        }
                    } else
                        $this->display();
                    break;
                case 'del':
                    if ($userId)
                        $data = $userModel->where('id=' . $userId)->select();
                    if ($data && $data['name'] == session('name'))
                        $this->error('不能删除自己', 'javascript:parent.location.reload();');
                    else
                        $result = $userModel->where('id=' . $userId)->delete();
                    if ($result)
                        $this->success('删除成功', 'javascript:parent.location.reload();');
                    else
                        $this->error('操作失败', 'javascript:parent.location.reload();');
                    break;
                case 'change':
                    if (IS_POST && $userModel->autoCheckToken($_POST)) {
                        $password = I('post.password');
                        $rePassword = I('post.repassword');
                        if ($password == $rePassword) {
                            $userInfo = array('id' => $userId,
                                'name' => $userName,
                                'password' => md5($password)
                            );
                            $result = $userModel->data($userInfo)->save();
                            if ($result)
                                $this->success('修改密码成功', 'javascript:parent.location.reload();');
                            else
                                $this->error('修改失败', 'javascript:parent.location.reload();');
                        } else
                            $this->error('操作出错', 'javascript:parent.location.reload();');
                    } else {
                        $data = $userModel->where('id=' . $userId)->find();
                        if ($data) {
                            $this->assign('data', $data);
                            $this->display();
                        } else {
                            $this->error('操作出错', 'javascript:parent.location.reload();');
                        }
                    }
                    break;
                case 'checkUserName':
                    if (IS_AJAX && !$result = $userModel->where('name="' . $userName . '"')->find())
                        echo json_encode(array('ok' => '可以使用',));
                    else
                        echo json_encode(array('error' => '已被使用'));
                    break;

                default:
                    $this->error('操作失败');
                    break;
            }
        else
            $this->error('登录超时，请重新登录', 'login.html');

    }

    /*文章管理
    *
    */
    public function  artManage()
    {
        $type = I('get.type');
        $title = I('title');
        $content = I('content');
        $id = I('get.id');
        $userName = I('userName');
        $data = array('title' => $title, 'content' => $content, 'username' => $userName);
        $artModel = D('Article'); //在artmodel中使用了tablename进行定义
        if (session('name') && session('logged')) {
            switch ($type) {
                case 'del':
                    if ($id)
                        $result = $artModel->where('id=' . $id)->delete();
                    if ($result)
                        $this->success('删除成功', 'javascript:parent.location.reload();');
                    else
                        $this->error('删除失败', 'javascript:parent.location.reload();');
                    break;
                case 'change':
                    if (IS_POST && $artModel->autoCheckToken($_POST)) {
                        $data['id'] = $id;
                        if ($id && $userName && $title && $content)
                            $result = $artModel->data($data)->save();
                        if ($result)
                            $this->success('修改成功', 'javascript:parent.location.reload();');
                        else
                            $this->error('修改失败', 'javascript:parent.location.reload();');
                    } else {
                        if ($id)
                            $data = $artModel->where('id=' . $id)->find();
                        if ($data)
                            $this->assign('data', $data);
                        $this->display();
                    }
                    break;
                case 'new':
                    if (IS_POST && $artModel->autoCheckToken($_POST)) {
                        if ($content && $title && $userName) {
                            $result = $artModel->data($data)->add();
                            if ($result)
                                $this->success('添加成功', 'javascript:parent.location.reload();');
                            else
                                $this->error('添加失败，请重新添加');
                        } else
                            echo '对不起您的操作有误';
                    } else
                        $this->display();
                    break;
                default:
                    $this->display();
            }
        } else
            $this->error('操作失败', 'javascript:parent.location.reload()');
    }

    public function  buildVerfy()
    {
        $Verify = new \Think\Verify();
        // 验证码字体使用 ThinkPHP/Library/Think/Verify/ttfs/5.ttf
        $Verify->fontttf = 'msyhl.ttc';
        $Verify->fontSize = 30;
        $Verify->length = 3;
        $Verify->useZh = true;
        $Verify->zhSet = '伟大的中华人民共和国万岁基业长青永享盛世我们生活来越美好一生健康医学发达科技进步';
        $Verify->entry();
    }

    public function check_verify($code, $id = '')
    {
        $verify = new \Think\Verify();
        return $verify->check($code, $id);
    }

    public function logout()
    {
        session('logged', null);
        $this->success('成功退出系统', 'login.html');
    }

    public function upload($dirname)
    {

        $config = array(
            'maxSize' => 100 * 1024 * 1024, //单位是b
            'savePath' => '/' . $dirname . '/',
            'saveName' => array('date', 'Y-m-d-H-i-s'),
            'rootPath' => WEBROOT . '/Public/Uploads/',
            'exts' => array('jpg', 'gif', 'png', 'jpeg'),
            'autoSub' => true,
            'subName' => array('date', 'Ymd'),
        );
        $upload = new \Think\Upload($config); //
        $info = $upload->upload();
        if (!$info) {
            $return = false; // 上传错误提示错误信息  如果目录不可写也会出现无法上传的情况，请检查目录权限
            \Think\Log::write(serialize($info));
        } else
            $return = $info['image'];
        //表单中的input file 的name必须为 image 否则获取不到文件夹信息
        return $return;
    }
}