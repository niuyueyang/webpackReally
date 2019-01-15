const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:'./entry/app-es6.js',
  output:{
    path:__dirname,
    filename: "./output/[name][hash:5].js"
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
