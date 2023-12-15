/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2023-11-16 10:57:28
 * @LastEditors: yang fu ren
 * @LastEditTime: 2023-12-13 12:45:54
 */
import {
  setUserToken,
  resetUser,
  setUserInfo
} from "./user";
import {
  reqLogin,
  reqLogout,
  verificationTokenAjax
} from "@/api/auth";
import {
  setToken,
  removeToken
} from "@/utils/auth";
export const login = (username, password) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogin({
        username: username,
        password: password
      })
      .then((response) => {
        const {
          data
        } = response;
        const token = data.accessToken;
        dispatch(setUserToken(token));
        dispatch(setUserInfo(data.userInfo));
        setToken(token);
        resolve({
          ...data.userInfo,
          role: "admin",
        });
        // const data  = response;
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
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    reqLogout(token)
      .then((res) => {
        if (res.code === 200) {
          dispatch(resetUser());
          removeToken();
          resolve(res);
        } else {
          const msg = res.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
        removeToken();
      });
  });
};
// 
export const verificationToken = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    verificationTokenAjax().then(res => {
      resolve()
    }).catch((err) => {
      reject(err)
    })
  })
};
