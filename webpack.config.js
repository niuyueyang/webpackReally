const productionConfig=require('./webpack.prod.config');//上线环境
const developmentConfig=require('./webpack.dev.config');//开发环境
const merge=require('webpack-merge');
const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzers=require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const generate=env=> {
  const scriptLoader=['babel-loader'];

  return{
    entry:{
      'app':'./entry/app.js',
    },
    output: {
      path: __dirname,
      filename: "./output/[name][hash:5].js"
    },
    resolve:{
      alias:{
        jquery$:path.resolve(__dirname,'libs/jquery.min.js')  //与下面的new webpack.ProvidePlugin定义的jquery对应,$意思是确切匹配到jquery文件，
                                                              // 而不是匹配到某一个目录，jquery与下面的ew webpack.ProvidePlugin定义的jquery对应
      },
    },
    module:{
      rules:[
        {
          test:/\.js?$/,
          exclude:/(node_modules)/,
          loader:'babel-loader'
        },
        {
          test: /\.(png|jpg|gif|jpeg)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name:'[name][hash:5]min.[ext]',
                limit:15000,
                publicPath:'/img',//绝对路径，background:url("/img/...")
                useRelativePath:true,//相对路径，background:url("img/...")
                outputPath: './output/img'
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
      new BundleAnalyzers(),
      new HtmlWebpackPlugin({
        template:'./index.html',
        path: path.resolve(__dirname, "output"), //将文件打包到output的目录
        filename: "index.html", //使用[name]打包出来的js文件会分别按照入口文件配置的属性来命名
      }),
    ],
    devServer: {
      //contentBase:path.join(__dirname,'./release'),
      historyApiFallback: true,
      inline: true,
      progress: true,
      hot:true,   //启动热更新
      hotOnly:true,//只要热更新，不刷新页面
      port:3001,
      host:'127.0.0.1',
    }
  }
}

module.exports=env=>{
  let config= env=='production'?productionConfig:developmentConfig;
  return merge(generate(env),config);
}
