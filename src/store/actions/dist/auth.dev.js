"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verificationToken = exports.logout = exports.login = void 0;

var _user = require("./user");

var _auth = require("@/api/auth");

var _auth2 = require("@/utils/auth");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var login = function login(username, password) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      (0, _auth.reqLogin)({
        username: username,
        password: password
      }).then(function (response) {
        var data = response.data;
        var token = data.accessToken;
        dispatch((0, _user.setUserToken)(token));
        dispatch((0, _user.setUserInfo)(data.userInfo));
        (0, _auth2.setToken)(token);
        resolve(_objectSpread({}, data.userInfo, {
          role: "admin"
        })); // const data  = response;
        // if (data.status === 201) {
        //   const token = data.data.accessToken;
        //   dispatch(setUserToken(token));
        //   dispatch(setUserInfo(data.data.userInfo));
        //   setToken(token);
        //   resolve({...data.data.userInfo, role: "admin",});
        // } else {
        //   const msg = data.message;
        //   reject(msg);
        // }
      })["catch"](function (error) {
        reject(error);
      });
    });
  };
};

exports.login = login;

var logout = function logout(token) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      (0, _auth.reqLogout)(token).then(function (res) {
        if (res.code === 200) {
          dispatch((0, _user.resetUser)());
          (0, _auth2.removeToken)();
          resolve(res);
        } else {
          var msg = res.message;
          reject(msg);
        }
      })["catch"](function (error) {
        reject(error);
        (0, _auth2.removeToken)();
      });
    });
  };
}; // 


exports.logout = logout;

var verificationToken = function verificationToken(token) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      (0, _auth.verificationTokenAjax)().then(function (res) {
        resolve();
      })["catch"](function (err) {
        reject(err);
      });
    });
  };
};

exports.verificationToken = verificationToken;