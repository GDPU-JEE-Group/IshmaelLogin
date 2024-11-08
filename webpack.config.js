const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const compressionLevel = require('zstd-napi/binding').maxCLevel();
const Zstd = require('zstd-napi');

const compress = (content, mimetype) => {
    return Zstd.compress(
        Buffer.from(`data:${mimetype};base64,${content.toString('base64')}`),
        { compressionLevel, strategy: 'btultra' }
    ).toString('base64');
};

module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.ts',
        manager: './src/manager.ts',
        manifest: './src/manifest.ts',
        spine: './src/spine.ts',
        decode: './src/decode.ts',
        c_ishmael: './src/components/ishmael.ts'
    },
    plugins: [new HtmlWebpackPlugin()],
    output: {
        filename: '[contenthash].js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /node_modules/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    stats: {
        warnings: false,
        errorDetails: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(fs|vs)$/,
                type: 'asset/source'
            },
            {
                test: /\.mp3$/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content) => {
                        return compress(content, 'audio/mpeg');
                    }
                }
            },
            {
                test: /\.atlas$/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content) => {
                        return compress(content, 'text/plain');
                    }
                }
            },
            {
                test: /\.json$/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content) => {
                        return compress(content, 'application/json');
                    }
                }
            },
            {
                test: /\.png$/,
                type: 'asset/inline',
                generator: {
                    dataUrl: (content) => {
                        return compress(content, 'image/png');
                    }
                }
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
};
