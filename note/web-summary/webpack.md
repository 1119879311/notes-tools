### webpack 的概念
webpack 是一个用于现代javascript应用程序的静态模块打包工具，在构建的时，会在内部形成一个依赖图，每一个依赖映射项目中每一个模块，最终生成一个或者多个bundle
- entry 入口
- output:出口
- loader: 加载机，模块转换器，针对不同类型文件最终转为模块
- plugin:插件可以贯穿整个打包编译过程，处理更广泛的事，比如优化，资源管理，注入全局变量等
- mode: 模式，development,production,none
#### webpack 的执行流程
webpack 命令执行后，首先会初始化，做参数校验，合拼等，并创建编译compiler实例，启动编译运行run 方法，从entry 入口配置出发，对每一个模块modules 调用对应的loader 继续转换，找到改模块module依赖的模块，会递归的进行编译处理，处理后会把每一个moduel 转为chunks，根据entry 入口来分组 多个chunk 会合拼到一个或多个bundle 中，在整个编译过程，会触发compiler的不同hook钩子，在不同的时期会调用插件的来进一步处理，插件将贯穿整个打包编译过程








###  webpack 中 optimization.splitChunks
解决重复依赖，分包的性能优化重要配置
先上官方的默认配置
```javascript
module.exports = {
	//....
	optimization:{
		splitChunks:{
			chunks: 'async',// 有效值为 all,async,initial
			maxAsyncRequests:30,// 按需加载时并行请求加载数
			maxinitialRequests:30, //入口点的最大并请求加载数
			minSize:20000, //生成chunks 最小体积
			maxSize: 0,
			minRemainingSize:0,//确保拆分后剩余的最小 chunk 体积超过限制来避免大小为零的模块,dev开发模式为0，其他模式为minSize值
			minChunks:1, //拆分前必须共享模块的最小 chunks 数（次数）
			enforceSizeThreshold:50000,//强制执行拆分的体积阈值和其他限制
			cacheGroups: {
				defaultVendors: {
				  test: /[\\/]node_modules[\\/]/,
				  priority: -10,
                  minChunks: 2,
				  reuseExistingChunk: true,
				}
			  },
		}
	}
}
```
参数进行分析

- chunks：取值 all | async | initial
	* all  : entry 入口的所有文件（异步和同步），公共的都会抽离成一个，加载一次，文件可能很大
	* async : 只抽离属于动态引入的文件
	* initial : 只从入口模块 拆分
	
- maxAsyncRequests： 按需加载时并行请求加载数，默认值30

- maxinitialRequests:入口点的最大并请求加载数

- minSize: 打包出来的chunks最小的size，单位是bytes

- maxSize: 打包后限制的包的大小

- maxInitialRequests： 限制入口的拆分数量，默认值30

cacheGroups对象参数分析

```javascript
cacheGroups: {
    vendors: {
		minChunks:2, //模块被至少引用两次
		chunks: 'initial',
		test: /[\\/]node_modules[\\/]/, //正则匹配
		priority: -10， //切分优先级
		filename: '[name].bundle.js', //打包的文件名
		enforce: '' //强制切分到这个块
	}，
	 default: {
        minChunks: 2,
        priority: -20,
        reuseExistingChunk: true;//重用切分的包，不切新的
    }
}
```
---

###  webpack 中的解析规则
- 绝对路径

``` javascript
import '/home/me/file';
```

- 相对路径

``` javascript
import './home/me/file';
```
- 模块路径

``` javascript
import 'webpack';
```
---

### webpack 的loader
##### loader 的特性
- loader 支持链式调用,链中的loader 会转换应用已经处理的内容，将结果转给下一个loader，最后将如期的结果以javascript的方式返回
- loader 的执行顺序是从左往右，从下而上的
- loader 可以是同步，也可以是异步
- loader 是运行在nodejs 中的
- loader 可以是以配置，内联，cli(shell 命令脚本) 方式调用

1.配置方式

```javascript
module.exports = {
module:{
	rules:[
		{test:/\.css^/,loader:"css-loader"},
		{test:/\.less^/,use:["style-loader",'css-loader','less-loader']}
	]
}
}
```
2. 内链方式

```javascript
import Style from "style-loader!css-loader!less-loader!./style.less"
```
3. cli 方式

```javascript
webpack --module-bind pug-loader --module-bind 'css=style-loader!css-loader'
```

#### loader 的编写

1. 需要引入两个工具库loader-util,schema-util

2. 单个loader资源或者多个loader资源时候 的第一个loader 应当返回的是一个值或者两个值，第一个是字符串或者是javasciprt 代码，第二个是suorceMap javascript 对象
写一个官方的例子

```javascript
//初始化一个项目，全部默认
npm init
```

```javascript
//安装bebel，webpack ,测试相关依赖
npm install jest babel-jest @babel/core @babel/preset-env memfs webpack,loader-utils --save-dev
```

babel.config.js
```javascript
module.exports = {
	presets:[
		[
			@babel/preset-env,{ targets:{node:"current"} }
		]
	]

}

```

src/loader.js 
```javascript
import {getOptions} from "loader-utils"
export default function loader(source){
    const options = getOptions(this)
    source = source.replace(/\[name\]/g, options.name);
    return `export default ${JSON.stringify(source)}`;
}
```

test/loader.test.js
```javascript
import compiler from "./compiler"
it("webpack is testing", async ()=>{
    let stats = await compiler("exaple.txt",{name:"Alice"})
    const output =await stats.toJson({ source: true }).modules[0].source;
    expect(output).toBe('export default "Hey Alice!\"');

})
```
test/compiler.js

```javascript
import path from "path"
import webpack from "webpack"
import {createFsFromVolume, Volume} from "memfs"

export default function(entry,options={}){
    let compiler = webpack({
        context:__dirname,
        entry: `./${entry}`,
        output:{
            filename:"boundle.js",
            path:path.resolve(__dirname)
        },
        module:{
            rules:[
                {
                    test:/\.txt/,
                    use:{
                        loader:path.resolve(__dirname,'../src/loader.js'),
                        options:options
                    }
                }
            ]
        }

    })
    //这里利用memfs 防止将打包结果输出到硬盘上
    compiler.outputFileSystem = createFsFromVolume(new Volume())
    compiler.outputFileSystem.join = path.join.bind(path)
    return new Promise((resolve,reject)=>{
        compiler.run((err,stats)=>{

            if(err){
                reject(err)
            }

            if (stats.hasErrors()) reject(stats.toJson().errors);

            resolve(stats);

        })

    })
}
```
package.json 配置两个地方
```javascript
{
 scripts:{
 	test:"jest"
 }
 "jest": {
    "testEnvironment": "node"
  },
}
```
最后测试 npm run test

----


# webpack Plugin插件
- 插件是一个类(函数),初始化的时候需要new 实例，可以传参数
- 原型上必须有一个方法apply,该方法的回调参数是一个compiler对象, 该对象将贯穿整个编译阶段
- webpack 插件底层是基于事件流的，实现是基于一个发布订阅的库叫tapable
- webpack 底层给开发者提供了很多不同编译阶段的钩子hooks,这些钩子统一对外暴露三个接口tap(同步)，AsyncTap(回调异步)，PromiseTap
- 钩子的回调拿到当前编译的compilation 对象，异步的钩子会有cb 回调(需要调用执行)
- compiler对象(apply原型方法提供参数)代表整个webapck 编译开始到结束的一个周期，compilation 对象(hooks钩子函数提供的参数)只是代表了当前某一个编译阶段的一次新的编译，比如文件的修改会重新创建compilation 对象
(异步)
- webpack compiler 对象提供的钩子：
 * run: 在编译器读取记录前开始执行
 * compile:  在一个新的 compilation创建前执行
 * compilation ：在一个新的compilation 创建后执行
 * make : 完成一次编译前执行
 * emit : 在生成文件到output目录之前执行
 * afterEmit :在生成文件到output目录之后执行
 * assetsEmitted: 生成文件的时候执行，提供访问产出文件的信息，回调参数file,info
 * done : 一次编译完成后执行
 
``` javascript
// 用法
module.exports = class {
  constructor(){}
  apply(complier){

      compiler.hooks.run.tap("run",function(){
          console.log("开始编译了")
      })

      compiler.hooks.compile.tap("compile",function(){
          console.log("compile")
      })

      compiler.hooks.done.tap("done",function(){
          console.log("done")
      })

  }

}

```


