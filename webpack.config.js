const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const dotEnv = require("dotenv-webpack")

module.exports = {
    entry: "./src/index.js",

    output: {
        path: path.join(__dirname, "../dist"),
        filename: "bundle.js",
        publicPath: "/",
    },

    plugins: [
        new HTMLWebpackPlugin({
            template: "src/index.html",
        }),
        new dotEnv(),
    ],

    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
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
        ],
    },

    resolve: {
        extensions: [".js", ".jsx"],
    },
}
