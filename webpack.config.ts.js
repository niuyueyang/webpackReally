const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
module.exports={
  entry:'./entry/app-typescript.ts',
  output:{
    path:__dirname,
    filename: "./output/bundle.js"
  },
  module:{
    rules:[
      {
        test:/\.ts?$/,
        exclude:/(node_modules)/,
        loader:'ts-loader'
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
