const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports={
  entry:'./entry/app-html.js',
  output:{
    path: path.resolve(__dirname, "output"), //将js文件打包到output的目录
    filename: "[name].js" //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
  },
  module:{
    rules:[
      {
        test:/\.js?$/,
        exclude:/(node_modules)/,
        loader:'babel-loader'
      },
      {
        test:/\.css?$/,
        exclude:/(node_modules)/,
        loaders:ExtractTextWebpackPlugin.extract({
          //转换.css文件需要使用的Loader
          use:[
            {
              loader:'css-loader'
            },
            {
              loader:'postcss-loader',
              options:{
                ident:'postcss',
                plugins:[
                  // require('autoprefixer')(),//postcss-cssnext已经包含autoprefixer
                  require('postcss-cssnext')()
                ]
              }
            }
          ]//压缩css代码
        }),
      },
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, "output"), //将文件打包到output的目录
      filename: "index.html", //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
      template:'./index.html',//要引入的html路径
      minify: {
        collapseWhitespace: true  //压缩空格
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
    }),
    //压缩css
    new optimizeCss({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true //是否将插件信息打印到控制台
    })
  ],
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
