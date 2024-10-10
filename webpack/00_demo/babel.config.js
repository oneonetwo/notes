module.exports = {
    presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        ["@babel/preset-typescript", {
            useBuiltIns: "usage",
            corejs: 3.8
        }]
    ]
}