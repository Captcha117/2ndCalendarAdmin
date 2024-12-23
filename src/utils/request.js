import axios from "axios";
import { MessageBox, Message } from "element-ui";
import store from "@/store";
import Vue from "vue";

const service = axios.create({
  baseURL: window.SITE_CONFIG.baseUrl, // api的base_url
  timeout: 30000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
  // withCredentials: false
});
service.interceptors.request.use(
  (config) => {
    config.headers["token"] = Vue.cookie.get("token");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.status === 200) {
      const res = response.data;
      if (res.code || res.code === 0) {
        if (res.code === 401) {
          //   MessageBox.confirm(
          //     i18n.tc("login.invalid"),
          //     i18n.tc("login.confirm"),
          //     {
          //       confirmButtonText: i18n.tc("login.login"),
          //       cancelButtonText: i18n.tc("global.cancel"),
          //       type: "warning",
          //     }
          //   ).then(() => {
          //     store.dispatch("user/resetState").then(() => {
          //       window.location.href = res.data ? res.data : "/auth/login";
          //       // window.location.href = "/login";
          //     });
          //   });
          return Promise.reject();
        }
        if (res.code !== 200 && res.code !== 0) {
          Message({
            message: res.msg || "服务错误",
            type: "error",
            duration: 2 * 1000,
          });
          return Promise.reject(new Error(res.msg || "服务错误"));
        } else {
          return res;
        }
      } else {
        return Promise.reject(res);
      }
    }
    return response.data;
  },
  (error) => {
    console.log("请求错误：" + error);
    const msg =
      error.response && error.response.data && error.response.data.msg;
    Message({
      message: msg || error.message,
      type: "error",
      duration: 2 * 1000,
    });

    return Promise.reject(error);
  }
);

export default service;
