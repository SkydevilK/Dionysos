const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
      // Enable sourcemaps for debugging webpack's output.
      devtool: "source-map",
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'bundle.min.js',
    publicPath: "/"
  },
  module: {
    
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        
        loader: 'awesome-typescript-loader',
        //test: /\.txt$/, use: 'raw-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ]
  },
  devServer: {
    host: 'localhost',
    port: 8090,
    historyApiFallback: true,
    open: true
  },
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ] 
}