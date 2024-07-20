const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { VueLoaderPlugin } = require('vue-loader');

var { allEntries, htmlPlugins } = getEntries();

module.exports = {
    entry: allEntries,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'asset/js/[name].bundle.js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.ts$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                },
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'asset/images',
                        },
                    },
                ],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'asset/fonts',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'asset/css/[name].css',
        }),
        ...htmlPlugins,
    ],
    devServer: {
        static: path.join(__dirname, 'dist'),
        compress: true,
        port: 8080,
        hot: true,
    },
    stats: {
        colors: true,
        children: true,
    },
};

function recursiveReaddirSync(folderPath) {
    var list = [],
        files = fs.readdirSync(folderPath),
        stats;

    files.forEach(function (file) {
        stats = fs.lstatSync(path.join(folderPath, file));
        if (stats.isDirectory()) {
            list = list.concat(
                recursiveReaddirSync(path.join(folderPath, file))
            );
        } else {
            list.push(path.join(folderPath, file));
        }
    });

    return list;
}

function getEntries() {
    const basePath = path.resolve(__dirname, './src/pages');
    const folderNames = fs.readdirSync(basePath);

    const allEntryPath = folderNames.reduce((entryPaths, folderName) => {
        const fullPath = path.resolve(basePath, folderName);
        const stat = fs.statSync(fullPath);
        if (!stat.isDirectory()) {
            return entryPaths;
        }
        return entryPaths.concat(
            recursiveReaddirSync(fullPath).filter((subdirectoryEntry) =>
                subdirectoryEntry.match(/entry\.(ts|js)/)
            )
        );
    }, []);

    const allEntries = allEntryPath.reduce((entries, entryPath) => {
        const fileName = path.basename(
            path.dirname(entryPath),
            path.extname(entryPath)
        );
        entries[fileName] = entryPath;
        return entries;
    }, {});

    const htmlPlugins = allEntryPath.map((entryPath) => {
        const fileName = path.basename(
            path.dirname(entryPath),
            path.extname(entryPath)
        );
        return new HtmlWebpackPlugin({
            filename: `${fileName}/index.html`,
            template: path.resolve(
                __dirname,
                `./public/${fileName}/index.html`
            ),
            chunks: [fileName],
        });
    });

    return { allEntries, htmlPlugins };
}
