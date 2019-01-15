const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');//清除目录

//在html里面直接引入img标签，需要先安装npm install html-loader --save

module.exports={
  entry:'./entry/app-html-img-font-css.js',
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
              loader:'css-loader',
            },
            {
              loader:'postcss-loader',
              options:{
                ident:'postcss',
                plugins:[
                  require('postcss-sprites')({
                    spritePath:'output/images',
                    retina:true,
                  }),//生成雪碧图
                  require('postcss-cssnext')()
                ]
              }
            }
          ]//压缩css代码
        }),
      },
      //打包html里面的img标签，file-loader或者url-loader,img-loader必须和html-loader一起使用，否则html-loader不起作用
      /*{
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            publicPath: "./images/",//设置打包后html里面的img路径
            outputPath: "images/"  //设置打包后图片的位置
          }
        }
        ]
      },*/
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
         /* {
            loader: 'file-loader',
            options: {
              publicPath:'../images',
              useRelativePath:true,
              outputPath: 'images'
            }
          },*/
          {
            loader: 'url-loader',
            options: {
              name:'[name][hash:5]min.[ext]',
              limit:5000,
              //publicPath:'../images',//绝对路径，background:url("/img/...")
              useRelativePath:true,//相对路径，background:url("img/...")
              outputPath: 'images/'
            }
          },
          //img压缩
          {
            loader:'img-loader',
            options:{
              pngquant:{
                quality:80
              }
            }
          },
        ]
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'img:data-src', 'audio:src'],
            minimize: true,
            //publicPath:'images/',
          }
        }
      },
      {
        test:/\.(woff2?|eot|ttf|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              name:'[name][hash:5]min.[ext]',
              limit:5000,
              // publicPath:'../fonts',//css引入路径设置，background:url("../fonts/...")
              useRelativePath:true,//相对路径，background:url("fonts/...")
              outputPath: 'fonts'
            }
          },
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      path: path.resolve(__dirname, "output"), //将文件打包到output的目录
      filename: "index.html", //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
      template:'./index.html',//要引入的html路径
      minify: {
        collapseWhitespace: false  //压缩空格
      }
    }),
    new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
    }),
    //压缩css
    /*new optimizeCss({
      cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
      cssProcessorOptions: {
        discardComments: { removeAll: true }
      },
      canPrint: true //是否将插件信息打印到控制台
    }),*/
    //清除目录
    new CleanWebpackPlugin(['output'])
  ],
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
