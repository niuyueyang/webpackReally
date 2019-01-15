const CleanWebpackPlugin=require('clean-webpack-plugin');//清除目录
const webpack=require('webpack');
module.exports={
  module:{
    rules:[
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
    ]
  },
  plugins:[
    new webpack.ProvidePlugin({
      $:'jquery'                 //如果是node_modules里面的文件，只需要new webpack.ProvidePlugin就可以，而要指定到本地文件，必须还要上面配置的alias
    }),
    new CleanWebpackPlugin(['output']),
    new webpack.NamedModulesPlugin(), // 新增
    new webpack.HotModuleReplacementPlugin(), //新增

  ],
  devtool: "cheap-module-source-map",   //一般要开启，便于本地调试,而对于css的source-map在每个options里面加入sourceMap:true
}
