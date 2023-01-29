const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: process.env.NODE_ENV !== "production",
  devServer: {
    proxy: {
      "/api": {
        // 项目服务器http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList
        target: "http://gmall-h5-api.atguigu.cn",
        // b站服务器https://www.bilibili.com/index/ding.json
        // target:'https://www.bilibili.com',
        //  允许跨域
        changOrigin: true,
        // 路径重写，/api代表http://gmall-h5-api.atguigu.cn
        // pathRewrite:{'/api':''}
      },
    },
  },
});
