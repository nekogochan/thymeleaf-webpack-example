const properties = require("./config/application.properties");
const {loadEntries} = require("./config/entries-extractor");
const {log} = require("./config/utils");
const {thymeleafHtmlPostProcessorWebpackPlugin} = require("./config/thymeleaf-html-post-processor-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => {
    const {entries, plugins} = loadEntries();

    log(`start webpack build with node version ${process.version}`);

    const loaders = {
        css: {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        },
        sass: {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        },
        postCss: "postcss-loader",
        miniCssExtract: MiniCssExtractPlugin.loader
    }

    return {
        mode: "development",
        entry: entries,
        output: {
            filename: "[id].js",
            path: properties.pathToDist,
            clean: true
        },
        resolve: {
            extensions: [".js"],
            alias: {
                "@src": properties.pathToSrc
            }
        },
        plugins: [
            new MiniCssExtractPlugin(),
            thymeleafHtmlPostProcessorWebpackPlugin,
            ...plugins
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        loaders.miniCssExtract,
                        loaders.css,
                        loaders.postCss
                    ]
                },
                {
                    test: /\.scss$/,
                    use: [
                        loaders.miniCssExtract,
                        loaders.css,
                        loaders.postCss,
                        loaders.sass
                    ]
                }
            ]
        }
    };
}