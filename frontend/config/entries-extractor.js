const properties = require('./application.properties');
const {globSync} = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {debug} = require("./utils");

module.exports = {
    loadEntries() {
        debug(`loading entries from ${properties.pathToEntries}...`);
        const entries = {};
        const plugins = [];

        globSync(properties.pathToEntries)
            .forEach(filePath => {
                debug(`found entry: ${filePath}`);
                const pathParts = properties.entryNameExtractor(filePath);
                const entryId = pathParts.join("--");
                entries[entryId] = filePath;

                plugins.push(
                    new HtmlWebpackPlugin({
                        template: properties.pathToScriptsAndStylesTemplate,
                        inject: "head",
                        chunks: [entryId],
                        filename: `${properties.pathToGeneratedTemplates}/${pathParts.join("/")}.html`
                    })
                )
            });

        debug("entries summary:");
        debug(JSON.stringify(entries, null, 2));

        return {entries, plugins}
    }
}
