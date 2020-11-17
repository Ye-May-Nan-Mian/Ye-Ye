const { override, addLessLoader } = require("customize-cra");

module.exports = override(
    addLessLoader({
        strictMath: true,
        noIeCompat: true,
        javascriptEnabled: true,
        cssLoaderOptions: {
            modules: { localIdentName: "[name]_[local]_[hash:base64:5]" }
        } // .less file used css-loader option, not all CSS file.
    })
);
