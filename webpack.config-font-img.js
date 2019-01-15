const path=require('path');
const webpack=require('webpack');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');

module.exports={
  entry:{
    'app':'./entry/app-font-img.js',
  },
  output:{
    path: path.resolve(__dirname, "output"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  module:{
    rules:[
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
                    spritePath:'output/img',
                    retina:true
                  }),//生成雪碧图
                  require('postcss-cssnext')()
                ]
              }
            }
          ]//压缩css代码
        }),
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
    })*/
  ],
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
