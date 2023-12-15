"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqLogin = reqLogin;
exports.reqLogout = reqLogout;
exports.registerAjax = registerAjax;
exports.sendCaptchaAjax = sendCaptchaAjax;
exports.verificationTokenAjax = verificationTokenAjax;
exports.changePwdAjax = changePwdAjax;
exports.getRolesAjax = getRolesAjax;

var _request = _interopRequireDefault(require("@/utils/request"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2023-11-16 10:57:27
 * @LastEditors: yang fu ren
 * @LastEditTime: 2023-12-13 15:36:02
 */
function reqLogin(data) {
  return (0, _request["default"])({
    url: '/user/login',
    method: 'post',
    data: data
  });
}

function reqLogout(params) {
  return (0, _request["default"])({
    url: '/user/logout',
    method: 'get',
    params: params
  });
}

function registerAjax(data) {
  return (0, _request["default"])({
    url: '/user/register',
    method: 'post',
    data: data
  });
}

function sendCaptchaAjax(params) {
  return (0, _request["default"])({
    url: '/user/registerCaptcha',
    method: 'get',
    params: params
  });
}

function verificationTokenAjax(params) {
  return (0, _request["default"])({
    url: '/user/verificationToken',
    method: 'get',
    params: params
  });
}

function changePwdAjax(data) {
  return (0, _request["default"])({
    url: '/user/update_password',
    method: 'post',
    data: data
  });
}

function getRolesAjax(params) {
  return (0, _request["default"])({
    url: '/user/getRules',
    method: 'get',
    params: params
  });
}