#### 创建项目
### `npx create-react-app <项目名称>` 

----
### 安装依赖
1 修改wepback的配置
### `npm install @craco/craco --save-dev`

2 支持less 
### `npm install craco-less --save-dev` 

3 支持装饰器
### `npm install @babel/plugin-proposal-decorators --save-dev` 

4 配置按需加载
### `npm babel-plugin-import --save-dev`

-----

####  修改package.json sciprt 脚本命令

```javascript
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
```
----
#### 项目根目录新建craco.config.js 配置文件

######  别名配置

```javascript
const path = require("path")
const addPath = dir => path.join(__dirname,dir);
module.exports = {
    webpack:{
        alias:{
            "@":addPath("src")
        }
    },
}
```
######  第三方ui库按需加载，如antd

```javascript
const cracoLess = require("craco-less");//单独配置babel无效，需要和craco-less 一起样式才有效果
module.exports = {
    babel:{
        plugins:[
            //第一个 style 为 true ,需要配置 craco-less一起才能生效
           ["import",{ libraryName: 'antd', style: true }];
            //第二种 style 为css ,不需要 craco-less
            // ['import', { libraryName: 'antd', libraryDirectory: 'es', style: "css" }],

        ]
    },
    plugins:[
        {
            plugin: cracoLess,
            options: {
              lessLoaderOptions: {
                lessOptions: {
                  modifyVars: { '@primary-color': '#1890ff' },
                  javascriptEnabled: true,
                   globalVars: {
                        hack: `true; @import '~@/assets/style/variable.less';`
                    }
                },
              },
            },
          },
       
    ],
}
```
######  配置cdn外部资源不打包

```javascript
const path = require("path")
const addPath = dir => path.join(__dirname,dir);
module.exports = {
    webpack:{
        externals:{
            echarts: "echarts",
        }
    },
}
```
######  配置接口跨域代理

```javascript
const path = require("path")
const addPath = dir => path.join(__dirname,dir);
module.exports = {
   devServer:{
        proxy: {
            "/api": {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: {
                    "^/api": "/api"
                }
            },
        } 
    }
}
```

###### 分割第三方库打包，自定义webpack 配置

```javascript
module.exports = {
    webpack:{
        // ...
        configure: (webpackConfig, { env, paths }) =>{
            webpackConfig.devtool = false;
            webpackConfig.optimization= {
                splitChunks: {
                    chunks: 'async',
                    minSize:  40000,
                    maxAsyncRequests: 5, // 最大异步请求数
                    maxInitialRequests: 4, // 页面初始化最大异步请求数
                    automaticNameDelimiter: '~', // 解决命名冲突
                    // name: true值将会自动根据切割之前的代码块和缓存组键值(key)自动分配命名,否则就需要传入一个String或者function.
                    name: true,
                    cacheGroups: {
                    common: {
                        name: 'chunk-common',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](react|react-dom|react-router|redux-saga|dva|react-router-dom|draft-js\/lib|core-js|@antv\/data-set\/build|)[\\/]/,
                        priority: -10,
                        },
                        antd: {
                        name: 'chunk-antd',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](@ant-design|antd|moment|immutable\/dist|rc-calendar\/es|braft-finder\/dist|lodash|rc-tree\/es)[\\/]/,
                        priority: -11,
                        },
                        echarts: {
                        name: 'chunk-echarts',
                        chunks: 'all',
                        test: /[\\/]node_modules[\\/](echarts)[\\/]/,
                        priority: 10,
                        },
                        
                    }
                }
            }
            }
        console.log(webpackConfig)
        console.log("环境：",env,paths)
        return webpackConfig

    }
}
```



###### 打包依赖插件分析webpack-bundle-analyzer

```javascript
const webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isPro = (dev)=>dev==="production";
module.exports = {
   webpack:{
         
        configure: (webpackConfig, { env, paths }) =>{
             if(isPro(env)){
                webpackConfig.plugins.push(new webpackBundleAnalyzer());
             }
        }
    }       
}
```

######  moment时间插件库过大，打包指定语言

```javascript
const webpack = require("webpack")
module.exports = {
    //...
   webpack:{ 
        configure: (webpackConfig, { env, paths }) =>{
            webpackConfig.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/));
        }
    }       
}
```
###### 打包压缩gz,使用库 compression-webpack-plugin(建议^5 的版本，过高会报错)


```javascript
const compressionWebpackPlugin = require("compression-webpack-plugin")
module.exports = {
   webpack:{ 
        configure: (webpackConfig, { env, paths }) =>{
           webpackConfig.plugins.push(new compressionWebpackPlugin({
                filename: '[path].gz[query]',
                algorithm: 'gzip',
                // test: /\.js$|\.html$|\.json$|\.css/,
                test: /\.js$|\.json$|\.css/,
                threshold: 10240, // 只有大小大于该值的资源会被处理
                minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
                // deleteOriginalAssets: true // 删除原文件
            }))
        }
    }       
}
```

######  配置支持装饰器，安装库 @babel/plugin-proposal-decorators

```javascript

module.exports = {
    babel:{
        plugins:[
           ['@babel/plugin-proposal-decorators', { legacy: true }]
        ]
    },
}
```

######  使用postcss-px2rem-exclude 和lib-flexible 做移动适配

```javascript
const px2rem = require("postcss-px2rem-exclude");
module.exports = {
    style:{
        postcss:{
            plugins:[
                px2rem({
                    remUnit: 37.5,
                    exclude:/node-modules/i
                })
            ]
        }
    },
}
```
