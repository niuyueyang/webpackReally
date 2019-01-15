//引入第三方js，第一种就是在html里面直接引入第三方cdn
//第二种就是在webpack.config.js里面的plugins加入new webpack.ProvidePlugin,适合于node_modules
//第三种就是引入本地自己定义的文件，默认引入libs/jquery.min.js
//import-loader，通过在rules里面引入规则
$(".li").addClass('newLi');
