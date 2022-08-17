const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.join(__dirname, "/dist"),
        filename: "bundle.js",
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
        }),
    ],

    module: {
        rules: [
            {
                test: /.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            ["@babel/preset-react", { runtime: "automatic" }],
                        ],
                    },
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(png|jp(e*)g|svg|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "images/[hash]-[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.less$/i,
                use: [
                    {
                        loader: "style-loader",
                    },
                    {
                        loader: "css-loader", // translates CSS into CommonJS
                    },
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            lessOptions: {
                                // If you are using less-loader@5 please spread the lessOptions to options directly
                                modifyVars: {
                                    "primary-color": "#35794A",
                                    "heading-color": "#35794A",
                                    "menu-dark-color": "#FFFFFF",
                                    "menu-dark-bg": "#35794A",
                                    "menu-dark-arrow-color": "#FFFFFF",
                                    "menu-dark-inline-submenu-bg": "#000c17",
                                    "menu-dark-highlight-color": "#fff",
                                    "menu-dark-item-active-bg": "#FFFFFF",
                                    "menu-dark-selected-item-icon-color":
                                        "#35794A",
                                    "menu-dark-selected-item-text-color":
                                        "#35794A",
                                    "menu-dark-item-hover-bg": "#35794A",
                                    "menu-highlight-color": "#35794A",
                                    "menu-dark-inline-submenu-bg": "#35794A",
                                },
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
        ],
    },
}
