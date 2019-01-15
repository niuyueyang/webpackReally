//本实例中主要涉及到dev,热更新以及调试操作

//在dev操作里面，具体到devServer以及它的proxy
//在热更新里面主要涉及到hot:true,hotOnly:true,（hotOnly根据需要而定）new webpack.NamedModulesPlugin(),   new webpack.HotModuleReplacementPlugin(),
//在调试里面增加devtool标签，以及修改rules标签里面的配置项（注意与webpack.config-css-less-sass里面rules配置的不同，这里只针对开发环境），在每个options里面增加sourceMap:true，以及注销singleton:true

const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const CleanWebpackPlugin=require('clean-webpack-plugin');//清除目录
const webpack=require('webpack');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');
module.exports={
  entry:'./entry/app-dev-sourceMap-hot.js',
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
      },
      {
        test:/\.css?$/,
        exclude:/(node_modules)/,
          //转换.css文件需要使用的Loader
        use: [
          {
            loader: 'style-loader',
            options: {
              //singleton:true,  //所有的样式代码放到一个style标签中
              sourceMap: true, //开启css调试
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true  //开启css调试
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true , //开启css调试
              plugins: [
                // require('autoprefixer')(),//postcss-cssnext已经包含autoprefixer
                require('postcss-cssnext')()
              ]
            }
          }
        ]//压缩css代码
      },
      {
        test:/\.less?$/,
        exclude:/(node_modules)/,
        use: [
          {
            loader: 'style-loader',
            options: {
              //singleton:true,  //所有的样式代码放到一个style标签中
              sourceMap: true, //开启css调试
            }
          },
            {
              loader: 'css-loader',
              options:{
                sourceMap: true , //开启css调试
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true , //开启css调试
                plugins: [
                  // require('autoprefixer')(),//postcss-cssnext已经包含autoprefixer
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'less-loader',
              options:{
                sourceMap: true , //开启css调试
              }
            }

        ]
      },
      {
        test:/\.scss?$/,
        exclude:/(node_modules)/,
        use: [
           {
            loader: 'style-loader',
            options:{
              //singleton:true,  //所有的样式代码放到一个style标签中
              sourceMap: true , //开启css调试
            }
          },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true , //开启css调试
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: true , //开启css调试
                plugins: [
                  // require('autoprefixer')(),//postcss-cssnext已经包含autoprefixer
                  require('postcss-cssnext')()
                ]
              }
            },
            {
              loader: 'sass-loader',
              options:{
                sourceMap: true , //开启css调试
              }
            }
        ]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          /*{
            loader: 'file-loader',
            options: {
              publicPath:'',
              useRelativePath:true,
              outputPath: 'img'
            }
          },*/
          {
            loader: 'url-loader',
            options: {
              name:'[name][hash:5]min.[ext]',
              limit:15000,
              //publicPath:'/img',//绝对路径，background:url("/img/...")
              useRelativePath:true,//相对路径，background:url("img/...")
              outputPath: 'img'
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
        test:/\.(woff2?|eot|ttf|svg)$/,
        use:[
          {
            loader: 'url-loader',
            options: {
              name:'[name][hash:5]min.[ext]',
              limit:5000,
              //publicPath:'/fonts',//绝对路径，background:url("/fonts/...")
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
      template:'./index.html'
    }),
    new webpack.ProvidePlugin({
      $:'jquery'                 //如果是node_modules里面的文件，只需要new webpack.ProvidePlugin就可以，而要指定到本地文件，必须还要上面配置的alias
    }),
    new CleanWebpackPlugin(['output']),
    new webpack.NamedModulesPlugin(), // 新增
    new webpack.HotModuleReplacementPlugin(), //新增
    /*new ExtractTextWebpackPlugin({
      filename: '[name].min.css',
    }),*/
    //压缩css
    // new optimizeCss({
    //   cssProcessor: require('cssnano'), //引入cssnano配置压缩选项
    //   cssProcessorOptions: {
    //     discardComments: { removeAll: true }
    //   },
    //   canPrint: true //是否将插件信息打印到控制台
    // })

  ],
  devtool: "cheap-module-source-map",   //一般要开启，便于本地调试,而对于css的source-map在每个options里面加入sourceMap:true
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    historyApiFallback: true,
    inline: true,
    progress: true,
    hot:true,   //启动热更新
    hotOnly:true,//只要热更新，不刷新页面
    port:3001,
    host:'127.0.0.1',
    proxy:{
      '/sop':{
        target:'http://localhost:3000',
        changeOrigin:true,
        logLevel:'debug',
        headers:{
          'Content-Type':"application/json; charset=utf-8",
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
        }  //设置headers
      },
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        logLevel:'debug',
      }
    }
  }
}
