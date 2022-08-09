module.exports = {
    publicPath: "/quest/",
    outputDir: 'dist',
    // publicPath: process.env.NODE_ENV === "production" ? "/admin" : "/",
    // assetsDir: 'static',
    // lintOnSave: process.env.NODE_ENV === 'development',
    lintOnSave: false,
    // mode : 'development',
    // indexPath: 'index.html',
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