const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports={
  entry:{
    'app':'./entry/app-css.js',
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
      {
        test:/\.less?$/,
        exclude:/(node_modules)/,
        use:ExtractTextWebpackPlugin.extract({
          fallback:{
            loader:'style-loader',
          },
          use:[
            {
              loader:'css-loader',
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
            },
            {
              loader:'less-loader',
            }
          ]
        })
      },
      {
        test:/\.scss?$/,
        exclude:/(node_modules)/,
        use:ExtractTextWebpackPlugin.extract({
          fallback:{
            loader:'style-loader',
          },
          use:[
            {
              loader:'css-loader',
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
            },
            {
              loader:'sass-loader',
            }
          ]
        })
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
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
