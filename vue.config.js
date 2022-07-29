module.exports = {
    // publicPath: "./",
    publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
    outputDir:'dist',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    mode : 'development',
    indexPath: 'index.html',
    devServer: {
        host: 'localhost',
        port: 8089,
          //没被占用，可以使用的端口
        open: true,
        proxy: {
          '/api':{
            target: process.env.VUE_APP_BASE_API, //接口域名
            changeOrigin: true,             //是否跨域
            secure: false,                   //是否https接口
            pathRewrite: {                  //路径重置
              '^/api': ''
            }
          }
        }
      }
}