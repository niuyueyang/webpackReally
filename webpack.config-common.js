const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:{
  	'pageA':'./entry/pageA-common.js',
    'pageB':'./entry/pageB-common.js',
  },
  output:{
    path: path.resolve(__dirname, "output"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/(node_modules)/,
        loader:'babel-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        // 注意: priority属性
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        // 首先: 打包node_modules中的文件
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    }
  },
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
