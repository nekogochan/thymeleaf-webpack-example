module.exports = {
    plugins: [
        require("autoprefixer"),
        require("postcss-viewport-unit-fallback"),
        require("postcss-calc"),
        require("cssnano")({
            preset: "default"
        })
    ]
}