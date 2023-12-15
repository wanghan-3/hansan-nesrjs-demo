/*
 * @Descripttion: 
 * @Author: yang fu ren
 * @version: 
 * @Date: 2023-11-16 10:57:27
 * @LastEditors: yang fu ren
 * @LastEditTime: 2023-12-13 15:36:02
 */
import request from '@/utils/request'
export function reqLogin(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function reqLogout(params) {
  return request({
    url: '/user/logout',
    method: 'get',
    params
  })
}
export function registerAjax(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}
export function sendCaptchaAjax(params) {
  return request({
    url: '/user/registerCaptcha',
    method: 'get',
    params
  })
}
export function verificationTokenAjax(params) {
  return request({
    url: '/user/verificationToken',
    method: 'get',
    params
  })
}
export function changePwdAjax(data) {
  return request({
    url: '/user/update_password',
    method: 'post',
    data
  })
}
export function getRolesAjax(params) {
  return request({
    url: '/user/getRules',
    method: 'get',
    params
  })
}
