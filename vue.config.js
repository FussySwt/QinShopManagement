module.exports = {
    publicPath: ".",
    outputDir: "dist",
    assetsDir: "static",
    // devServer: {
    //     proxy:{
    //         '/qinqin':{
    //             // target: 'http://192.168.0.113:8081',
    //             // target: 'http://218.94.150.38:8081',
    //             target: 'http://192.168.43.35:8081',
    //             changeOrigin:true
    //         }
    //     }
    // },
    chainWebpack: config =>{
        config.plugin('html').tap(args => {
            args[0].title = '沁商城';
            return args;
        })
    },
}