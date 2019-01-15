const path=require('path');
const HtmlWebpackPlugin=require('html-webpack-plugin');
const webpack=require('webpack');
module.exports={
  entry:'./entry/app-thirdJs.js',
  output:{
    path:__dirname,
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
      //以下这种方式也是引入第三方js一种办法，如果具备，则无需在plugins里面 new webpack.ProvidePlugin,如果使用本地文件，则仍需配合alias
      {
        test:path.resolve(__dirname,'entry/app.js'),
        use:[
          {
            loader:'imports-loader',
            options:{
              $:'jquery'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.html'
    }),
    /*new webpack.ProvidePlugin({
      $:'jquery'                 //如果是node_modules里面的文件，只需要new webpack.ProvidePlugin就可以，而要指定到本地文件，必须还要上面配置的alias
    })*/
  ],
  devServer: {
    //contentBase:path.join(__dirname,'./release'),
    open:true,//自动打开浏览器
    port:9001,
    disableHostCheck: true
  }
}
