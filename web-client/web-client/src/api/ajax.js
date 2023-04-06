// 引入 axios
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 打印进度条相关的配置
// console.log(nprogress)
// 引入进度条样式
import "nprogress/nprogress.css";
// 引入store
import store from "@/store";
// 利用axios中的create方法去创建一个axios实例
const newAxios = axios.create({
  // 配置对象
  // 配置基础地址
  baseURL: "/api",
  // 配置一个请求超时的时间
  timeout: 5000
});

// 请求拦截器，可以在请求发出去之前做一些事情
newAxios.interceptors.request.use(
  config => {
    // config:是一个配置对象，里面有一个配置方法很重要，叫做请求头headers
    // 请求开始时进度条开始
    nprogress.start();
   //  if (store.state.Detail.uuid_token) {
   //    config.headers.userTempId = store.state.Detail.uuid_token;
   //  }
   //  //如果仓库中有token,就把token以请求头的形式带给服务器
   //  if (store.state.Login.data.token) {
   //    config.headers.token = store.state.Login.data.token;
   //  } else if (sessionStorage.getItem("userToken")) {
   //    config.headers.token = sessionStorage.getItem("userToken");
   //  }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);
// 响应拦截器，服务器的数据回来后，可以做一些事情
newAxios.interceptors.response.use(
  res => {
    // 请求相应结束时关闭进度条
    nprogress.done();
    // console.log(res);

    // 返回结果的数据
    return res;
  },
  err => {
    //响应失败的回调函数，失败时可以做一些事情
    // 返回失败信息
    return console.log(err.message);
  }
);

function ajax(url = "", params = {}, type = "GET") {
  // 1. 定义promise对象
  let promise;
  return new Promise((resolve, reject) => {
    // 2. 判断请求的方式
    if ("GET" === type) {
      // 2.1 拼接请求字符串
      let paramsStr = "";
      Object.keys(params).forEach(key => {
        paramsStr += key + "=" + params[key] + "&";
      });
      // 2.2 过滤最后的&
      if (paramsStr !== "") {
        paramsStr = paramsStr.substr(0, paramsStr.lastIndexOf("&"));
      }
      // 2.3 完整路径
      url += "?" + paramsStr;
      // 2.4 发送get请求
      promise = newAxios.get(url);
    } else if ("POST" === type) {
      promise = newAxios.post(url, params);
    }
    // 3. 返回请求的结果
    promise
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
}

export default ajax;
