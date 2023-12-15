import React, { useState,useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button, message, Spin } from "antd";
import { connect } from "react-redux";
import DocumentTitle from "react-document-title";
import "./index.less";
import { login, getUserInfo } from "@/store/actions";
import {registerAjax, sendCaptchaAjax} from '@/api/auth'
import { Link } from "react-router-dom/cjs/react-router-dom";

const Login = (props) => {
  const { form, token, login, getUserInfo } = props;
  const { getFieldDecorator } = form;

  const [loading, setLoading] = useState(false);
 
  // 邮箱验证码倒计时
  // const [verificationCodeTimer,setVerificationCodeTimer] = useState(null)
  const [timerCount,setTimerCount] = useState(null)
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

  const handleLogin = (data) => {
    // 登录完成后 发送请求 调用接口获取用户信息
    setLoading(true);
    registerAjax(data)
      .then((data) => {
        setLoading(false);
        form.resetFields()
        message.success("注冊成功");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error,666);
        // message.error(error);
      });
  };
  // 获取用户信息
  const handleUserInfo = (token) => {
    getUserInfo(token)
      .then((data) => {})
      .catch((error) => {
        message.error(error);
      });
  };
  /**
   * 发送邮箱验证码
   */
  const sendEmailVerCode=()=>{
    const address = form.getFieldValue('email')
    if(!address){
      message.error('请输入邮箱');
    }else{
      sendCaptchaAjax({address,type:'register'}).then(res=>{
        console.log(res,'1111222');
        setTimerCount(60)
      })
    }
  }
  const handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault();

    // 对所有表单字段进行检验
    form.validateFields((err, values) => {
      console.log(values);
      // 检验成功
      if (!err) {
        handleLogin(values);
      } else {
        console.log("检验失败!");
      }
    });
  };

  if (token) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <DocumentTitle title={"用户注册"}>
      <div className="login-container">
        <Form onSubmit={handleSubmit} className="content">
          <div className="title">
            <h2>用户注册</h2>
          </div>
          <Spin spinning={loading} tip="注册中...">
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入用户名",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入密码",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("nickname", {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: "请输入昵称",
                  },
                ],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="昵称"
                />
              )}
            </Form.Item>
            <Form.Item>
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
                  className="email-input"
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱"
                  suffix={<Button type="primary" onClick={sendEmailVerCode} disabled={timerCount}>发送验证码{timerCount||""}</Button>}
                />
              )}
            </Form.Item>
            <Form.Item>
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
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="邮箱验证码"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="success"
                htmlType="submit"
                className="login-form-button"
              >
                注册
              </Button>
            </Form.Item>
            <div className="go-register">
              <Link
                type="default"
                to="/login"
              >
                已有账号？去登录
              </Link>
            </div>
          </Spin>
        </Form>
      </div>
    </DocumentTitle>
  );
};

const WrapLogin = Form.create()(Login);

export default connect((state) => state.user, { login, getUserInfo })(
  WrapLogin
);
