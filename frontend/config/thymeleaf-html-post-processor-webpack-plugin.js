const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Добавляет префикс th: для js и css тегов
 */

const replacements = [
    {
        regex: /src="\S+\/static(\S+)"/g,
        replacement: "th:src=\"@{$1}\""
    },
    {
        regex: /href="\S+\/static(\S+)"/g,
        replacement: "th:href=\"@{$1}\""
    }
];

const NAME = "thymeleafHtmlPostProcessorWebpackPlugin";

const proceed = (data, callback) => {
    for (let replacement of replacements) {
        data.html = data.html.replaceAll(
            replacement.regex,
            replacement.replacement
        );
    }
    callback(null, data);
};

module.exports = {
    thymeleafHtmlPostProcessorWebpackPlugin: {
        apply(compiler) {
            compiler.hooks.compilation.tap(
                NAME,
                (compilation) => {
                    HtmlWebpackPlugin.getHooks(compilation)
                        .beforeEmit
                        .tapAsync(
                            NAME,
                            proceed
                        );
                });
        }
    }
};