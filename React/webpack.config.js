var config = {
    entry: "./main.js", // 设置入口文件
    output: {
        path: "./",
        filename: "index.js", // 设置导出文件为index.js
    },
    devServer: {
        inline: true,
        port: 7777, // 设定使用webpack-dev-server工具的服务器端口
    },
    module: {
        loaders: [
            {
                // 引入babel模块处理ES6代码
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel",

                query: {
                    presets: ["es2015", "react"],
                },
            },
        ],
    },
};
module.exports = config; // 导出config文件
