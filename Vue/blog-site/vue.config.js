const {defineConfig} = require('@vue/cli-service');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
    transpileDependencies: false, configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            return {
                plugins: [new BundleAnalyzerPlugin()], externals: {
                    vue: "Vue",
                    vuex: "Vuex",
                    "vue-router": "VueRouter",
                    axios: "axios",
                    "mockjs": "Mock"
                }
            }
        } else {
            // 为开发环境修改配置...
        }
    }
});


