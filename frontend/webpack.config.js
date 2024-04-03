const properties = require("./config/application.properties");
const {loadEntries} = require("./config/entries-extractor");
const {log} = require("./config/utils");
const {thymeleafHtmlPostProcessorWebpackPlugin} = require("./config/thymeleaf-html-post-processor-webpack-plugin");

module.exports = (env) => {
    const {entries, plugins} = loadEntries();

    log(`start webpack build with node version ${process.version}`);

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
            thymeleafHtmlPostProcessorWebpackPlugin,
            ...plugins
        ],
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: ["style-loader", "css-loader"]
                        }
                    ]
                }
            ]
        }
    };
}