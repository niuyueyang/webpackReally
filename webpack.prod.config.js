/*const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
const optimizeCss = require('optimize-css-assets-webpack-plugin');
var plugins=[];
const cssExtractnew=[new ExtractTextWebpackPlugin({filename: './output/[name].min.css'})];
module.exports={
  cssExtractnew
}*/
const ExtractTextWebpackPlugin=require('extract-text-webpack-plugin');//npm install extract-text-webpack-plugin@next --save
module.exports={
  module:{
    rules:[
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
    new ExtractTextWebpackPlugin({filename: './output/[name].min.css'})
  ]
}
