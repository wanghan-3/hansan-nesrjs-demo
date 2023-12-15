"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _store = _interopRequireDefault(require("@/store"));

var _antd = require("antd");

var _auth = require("@/utils/auth");

var _actions = require("@/store/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

//创建一个axios示例
var service = _axios["default"].create({
  baseURL: process.env.REACT_APP_BASE_API,
  // api 的 base_url
  timeout: 5000 // request timeout

}); // 请求拦截器


service.interceptors.request.use(function (config) {
  // Do something before request is sent
  if (_store["default"].getState().user.token) {
    // 让每个请求携带token-- ['Authorization']为自定义key 请根据实际情况自行修改
    config.headers.Authorization = 'Bearer ' + (0, _auth.getToken)();
  }

  return config;
}, function (error) {
  // Do something with request error
  console.log(error); // for debug

  Promise.reject(error);
}); // 响应拦截器

service.interceptors.response.use( // (response) => response,

/**
 * 下面的注释为通过在response里，自定义code来标示请求状态
 * 当code返回如下情况则说明权限有问题，登出并返回到登录页
 * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
 * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
 */
function (response) {
  console.log(response, 'response');
  var res = response.data;

  if (res.code !== 200 && res.code !== 201) {
    if (res.code === 403) {
      _antd.Modal.confirm({
        title: "确定登出?",
        content: "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
        okText: "重新登录",
        cancelText: "取消",
        onOk: function onOk() {
          var token = _store["default"].getState().user.token;

          _store["default"].dispatch((0, _actions.logout)(token));
        },
        onCancel: function onCancel() {
          console.log("Cancel");
        }
      });
    } else if (res.code === 401) {
      _antd.Modal.error({
        title: "身份验证失败",
        content: "您的身份验证已过期或无效，请重新登录",
        okText: "重新登录",
        onOk: function onOk() {
          (0, _auth.removeToken)();
        }
      });
    } else {
      _antd.message.error(res.message, 2.5);
    } // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
    //   // 请自行在引入 MessageBox
    //   // import { Message, MessageBox } from 'element-ui'
    //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //     confirmButtonText: '重新登录',
    //     cancelButtonText: '取消',
    //     type: 'warning'
    //   }).then(() => {
    //     store.dispatch('FedLogOut').then(() => {
    //       location.reload() // 为了重新实例化vue-router对象 避免bug
    //     })
    //   })
    // }


    return Promise.reject('error');
  } else {
    return response.data;
  }
}, function (error) {
  console.log("err" + error); // for debug

  var response = error.response;

  if (response.status === 403) {
    _antd.Modal.confirm({
      title: "确定登出?",
      content: "由于长时间未操作，您已被登出，可以取消继续留在该页面，或者重新登录",
      okText: "重新登录",
      cancelText: "取消",
      onOk: function onOk() {
        var token = _store["default"].getState().user.token;

        _store["default"].dispatch((0, _actions.logout)(token));
      },
      onCancel: function onCancel() {
        console.log("Cancel");
      }
    });
  } else if (response.status === 404) {
    console.log(response);

    _antd.message.error('not found 404');

    return Promise.reject(response);
  } else if (response.status === 504) {
    console.log(response);

    _antd.message.error('timeout 504');

    return Promise.reject(response);
  }

  return Promise.reject(error);
});
var _default = service;
exports["default"] = _default;