const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:process.env.NODE_ENV==='dev',//在chrome浏览器里面会对应上vue文件
  configureWebpack:{
    devtool:process.env.NODE_ENV === 'dev' ? 'source-map' : undefined
  }
})
