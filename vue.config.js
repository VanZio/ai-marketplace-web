const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/', 
  devServer: {
    proxy: {
      '^/api': {
        target: 'https://ai-marketplace-backend.onrender.com', // backend server URL
        changeOrigin: true,
        logLevel: 'debug',
        pathRewrite: { 'https://ai-marketplace-backend.onrender.com/api': '' },
      },
    },
  },
});
