"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reqUserInfo = reqUserInfo;
exports.getUsers = getUsers;
exports.deleteUser = deleteUser;
exports.editUser = editUser;
exports.reqValidatUserID = reqValidatUserID;
exports.addUser = addUser;

var _request = _interopRequireDefault(require("@/utils/request"));   

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function reqUserInfo(data) {
  return (0, _request["default"])({
    url: '/userInfo',
    method: 'post',
    data: data
  });
}

function getUsers(params) {
  return (0, _request["default"])({
    url: '/user/list',
    method: 'get',
    params: params
  });
}

function deleteUser(data) {
  return (0, _request["default"])({
    url: '/user/delete',
    method: 'post',
    data: data
  });
}

function editUser(data) {
  return (0, _request["default"])({
    url: '/user/edit',
    method: 'post',
    data: data
  });
}

function reqValidatUserID(data) {
  return (0, _request["default"])({
    url: '/user/validatUserID',
    method: 'post',
    data: data
  });
}

function addUser(data) {
  return (0, _request["default"])({
    url: '/user/add',
    method: 'post',
    data: data
  });
}