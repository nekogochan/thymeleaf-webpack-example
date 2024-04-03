const path = require("path");
const {enableDebug, debug} = require("./utils");

const p = {};
// основное:
p.pathToConfigs = __dirname
p.pathToFrontend = path.resolve(p.pathToConfigs, "..");
p.pathToProject = path.resolve(p.pathToFrontend, "..");
p.pathToResources = path.resolve(p.pathToProject, "./src/main/resources")
p.pathToTemplates = path.resolve(p.pathToResources, "./templates");
p.pathToDist = path.resolve(p.pathToResources, "./static/dist");

// исходные файлы фронта:
p.pathToSrc = path.resolve(p.pathToFrontend, "./src")
p.pathToScripts = path.resolve(p.pathToSrc, "./scripts")
p.pathToEntries = path.resolve(p.pathToScripts, "./modules/**/index.js").replaceAll("\\", "/");
p.entryNameExtractor = (filePath) => filePath.replaceAll("\\", "/").matchAll(/modules\/(\S+)\/index.js/g).next().value[1].split('/');

// генерируемые темплейты:
p.pathToScriptsAndStylesTemplate = path.resolve(p.pathToConfigs, "./scripts-and-styles-template.html")
p.pathToGeneratedTemplates = path.resolve(p.pathToTemplates, "./generated");
p.debugEnabled = true;

if (p.debugEnabled) {
    enableDebug();
}
debug("application.properties:")
debug(JSON.stringify(p, null, 2));

module.exports = p;
