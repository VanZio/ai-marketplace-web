const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', 
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8082', // backend server URL
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { 'http://localhost:8082/api': '' },
      },
    },
  },
});
