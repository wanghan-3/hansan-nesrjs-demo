import React, { useState ,useEffect} from "react";
import { connect } from "react-redux";
import { Icon, Menu, Dropdown, Modal, Layout, Avatar,Tabs,Form ,Input, Button, message, Upload } from "antd";
import { Link } from "react-router-dom";
import { logout, getUserInfo } from "@/store/actions";
import FullScreen from "@/components/FullScreen";
import Settings from "@/components/Settings";
import Hamburger from "@/components/Hamburger";
import BreadCrumb from "@/components/BreadCrumb";
import "./index.less";
import { changePwdAjax, sendCaptchaAjax } from "@/api/auth";
const { Header } = Layout;
const { TabPane } = Tabs; 
const LayoutHeader = (props) => {
  const {
    token,
    avatar,
    sidebarCollapsed,
    logout,
    getUserInfo,
    showSettings,
    fixedHeader,
    form
  } = props;
  const [settingModelShow,setSettingModelShow] = useState(false)
  const [settingMenuCurrent,setSettingMenuCurrent] = useState('')
  const [timerCount,setTimerCount] = useState(0)
  const [forms,setForms] = useState([])
  const [imageUrl,imageUrlChange] = useState('')
  let verificationCodeTimer = null
  useEffect(()=>{
    //如果设置倒计时且倒计时不为0
      if(timerCount&&timerCount!==0)
      verificationCodeTimer= setTimeout( ()=>{
        setTimerCount(timerCount=>timerCount-1)
          console.log(timerCount,'timerCount');
          },1000)
      //清楚延时器
      return ()=>{
          clearTimeout(verificationCodeTimer)
      }
  },[timerCount])
  // token && getUserInfo(token);
  const handleLogout = (token) => {
    Modal.confirm({
      title: "注销",
      content: "确定要退出系统吗?",
      okText: "确定",
      cancelText: "取消",
      onOk: () => {
        logout(token);
      },
    });
  };
  const onClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout(token);
        break;
      case "setting":
        setSettingModelShow(!settingModelShow)
        // handleLogout(token);
        break;
      default:
        break;
    }
  };
  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="dashboard">
        <Link to="/dashboard">首页</Link>
      </Menu.Item>
      <Menu.Item key="project">
        <a
          target="_blank"
          href="https://github.com/NLRX-WJC/react-antd-admin-template"
          rel="noopener noreferrer"
        >
          项目地址
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="setting">用户设置</Menu.Item>
      <Menu.Item key="logout">注销</Menu.Item>
    </Menu>
  );
  const computedStyle = () => {
    let styles;
    if (fixedHeader) {
      if (sidebarCollapsed) {
        styles = {
          width: "calc(100% - 80px)",
        };
      } else {
        styles = {
          width: "calc(100% - 200px)",
        };
      }
    } else {
      styles = {
        width: "100%",
      };
    }
    return styles;
  };
  // 
  const sendEmailVerCode =(type)=>{
    const address = form.getFieldValue('email')
    if(!address){
      message.error('请输入邮箱');
    }else{
    sendCaptchaAjax({address,type}).then(res=>{
      setTimerCount(60)
    })
  }
  }
  const handleClick =(event)=>{
    console.log(event,'event');
  }
  const handleSubmit = (event)=>{
    // 阻止事件的默认行为
    event.preventDefault();
    console.log(form,forms);
    // forms[0].validateFields((err, values) => {
    //   console.log(values);
    //   // 检验成功
    // });
    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      console.log(values);
      changePwdHandel(values)
      // 检验成功
    });
  }
  // 修改密码
  const changePwdHandel=(data)=>{
    changePwdAjax().then(res=>{
      console.log(res,'8888');
    })
  }
  // 上传前回调
  const beforeUpload = (file)=>{
    console.log(file,'file');
  }
  // 上传
  const handleChange=(file)=>{
    console.log(file,'fileChange');
  }
  const { getFieldDecorator } = form;
  const uploadButton = (
    <div>
      <Icon type={'plus'} />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const settingMenu = ()=>{
    return  <Tabs defaultActiveKey="1" className="setting-tabs" tabPosition="left" onChange={handleClick}>
    <TabPane tab="用户信息" key="1">
    <Form form={forms[0]} onSubmit={handleSubmit} className="set-password-from">
          {/* <Spin spinning={loading} tip="注册中..."> */}
          
            <Form.Item label="头像">
              {getFieldDecorator("avatar")(
                // <Input
                //   prefix={
                //     <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                //   }
                //   placeholder="新密码"
                // />
                <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
              </Upload>
              )}
            </Form.Item>
            <Form.Item  label="昵称">
              {getFieldDecorator("confirmPassword")(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="昵称"
                />
              )}
            </Form.Item>
            <Form.Item  label="邮箱">
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入邮箱",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱"
                 
                />
              )}
            </Form.Item>
            <Form.Item  label="邮箱验证码">
              {getFieldDecorator("captcha", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入邮箱验证码",
                  },
                ],
              })(
                <Input
                  className="email-input"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱验证码"
                  suffix={<Button type="primary" onClick={()=>sendEmailVerCode('updateUser')} disabled={timerCount}>发送验证码{timerCount||""}</Button>}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="success"
                htmlType="submit"
                className="login-form-button"
              >
                修改
              </Button>
            </Form.Item>
          {/* </Spin> */}
    </Form>
    </TabPane>
    <TabPane tab="用户密码" key="2">
    <Form form={forms[1]}  onSubmit={handleSubmit} className="set-password-from">
          {/* <Spin spinning={loading} tip="注册中..."> */}
          
            <Form.Item label="新密码">
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入新密码",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="新密码"
                />
              )}
            </Form.Item>
            <Form.Item  label="确认密码">
              {getFieldDecorator("confirmPassword", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入确认密码",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="确认密码"
                />
              )}
            </Form.Item>
            <Form.Item  label="邮箱">
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入邮箱",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱"
                 
                />
              )}
            </Form.Item>
            <Form.Item  label="邮箱验证码">
              {getFieldDecorator("captcha", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入邮箱验证码",
                  },
                ],
              })(
                <Input
                  className="email-input"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱验证码"
                  suffix={<Button type="primary" onClick={()=>sendEmailVerCode('password')} disabled={timerCount}>发送验证码{timerCount||""}</Button>}
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="success"
                htmlType="submit"
                className="login-form-button"
              >
                修改
              </Button>
            </Form.Item>
          {/* </Spin> */}
    </Form>
    </TabPane>
    {/* <TabPane tab="Tab 3" key="3">
      Content of Tab Pane 3
    </TabPane> */}
  </Tabs>
  }
  return (
    <>
      {/* 这里是仿照antd pro的做法,如果固定header，
      则header的定位变为fixed，此时需要一个定位为relative的header把原来的header位置撑起来 */}
      {fixedHeader ? <Header /> : null}
      <Header
        style={computedStyle()}
        className={fixedHeader ? "fix-header" : ""}
      >
        <Hamburger />
        <BreadCrumb />
        <div className="right-menu">
          <FullScreen />
          {showSettings ? <Settings /> : null}
          <div className="dropdown-wrap">
            <Dropdown overlay={menu}>
              <div>
                <Avatar shape="square" size="medium" src={avatar} />
                <Icon style={{ color: "rgba(0,0,0,.3)" }} type="caret-down" />
              </div>
            </Dropdown>
          </div>
        </div>
        <Modal
          title="用户设置"
          visible={settingModelShow}
          onCancel={()=>setSettingModelShow(false)}
          className="user-setting-modal"
        >
          {settingMenu()}
        </Modal>
      </Header>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    ...state.app,
    ...state.user,
    ...state.settings,
  };
};
export default connect(mapStateToProps, { logout, getUserInfo })( Form.create()(LayoutHeader));
