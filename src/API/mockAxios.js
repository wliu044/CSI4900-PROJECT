// 引入 axios
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 打印进度条相关的配置
// console.log(nprogress)
// 引入进度条样式
import "nprogress/nprogress.css";
// 利用axios中的create方法去创建一个axios实例
const newAxios = axios.create({
  // 配置对象
  // 配置基础地址
  baseURl:'/mock',
  // 配置一个请求超时的时间
  timeout: 5000,
});

// 请求拦截器，可以在请求发出去之前做一些事情
newAxios.interceptors.request.use(
  (config) => {
    // config:是一个配置对象，里面有一个配置方法很重要，叫做请求头headers
    // 请求开始时进度条开始
    // console.log(config);
    nprogress.start();
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
// 响应拦截器，服务器的数据回来后，可以做一些事情
newAxios.interceptors.response.use(
  (res) => {
    // 请求相应结束时关闭进度条
    nprogress.done();
    // console.log(res);
 
    // 返回结果的数据
    return res
  },
  (err) => {
    //响应失败的回调函数，失败时可以做一些事情
    // 返回失败信息
    return console.log(err.message);
  }
);

export default newAxios;
