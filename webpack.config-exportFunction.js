const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:{
    'page':'./entry/page-exportFunction.js',
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
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
