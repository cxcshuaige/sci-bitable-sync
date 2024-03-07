module.exports = {
    mpa: false,
    dll: [
        "react",
        "react-dom",
        "react-helmet",
        "react-router",
        "react-router-dom",
        "@emotion/css",
        "qiankun",
        "hoist-non-react-statics",
        "axios",
        "classnames",
        "immer",

        // "redux",
        // "react-redux",
        // "redux-thunk",
        // "reselect",
        // "@reduxjs/toolkit",

        "mobx",
        "mobx-react",
        "mobx-react-lite"
    ],
    micro: 'main',
    outputPath: "../dist/public/dist",
    // outputPath: "./dist", // 打包输出目录   bff 时的值public目录 ../dist/public/dist
    publicPath: "/public/dist/", // bff 时的值 否则 cdn地址 或 静态服务地址 /public/dist/
    dev: {
        port: 8080,
        publicPath: "http://localhost:8080/", // devserver 读这个
        // https: {
        //     key: fs.readFileSync(path.join(__dirname, "./local.cxc.tech-key.pem")),
        //     cert: fs.readFileSync(path.join(__dirname, "./local.cxc.tech.pem"))
        // }
    }
}