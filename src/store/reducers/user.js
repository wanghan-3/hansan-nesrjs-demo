import * as types from "../action-types";
import { getToken } from "@/utils/auth";
const initUserInfo = {
  userInfo:{},
  role:"admin",
  avatar: "https://s1.ax1x.com/2020/04/28/J5hUaT.jpg",
  token: getToken(),
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_USER_TOKEN:
      return {
        ...state,
        token: action.token
      };
    case types.USER_SET_USER_INFO:
      return {
        ...state,
        userInfo:action.userInfo
      };
    case types.USER_RESET_USER:
      return {};
    default:
      return state;
  }
}
