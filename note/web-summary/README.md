### 什么是纯函数
输入输出都是显式的，返回值 只有与参数有关，且无其他的副作用，如log,使用外部变量，修改引用参数的属性值等这些都是属于副作用，纯函数容易组合，调试，不复杂

----
###什么是闭包
概况：闭包就是能获取其他函数内部的变量的函数，或者调用子函数，子函数所在父函数的作用域不会被释放
作用：可以获取函数内部的私有属性,避免全局污染
弊端：容易造成内存泄漏

----
### 如何解决闭包造成的内存泄露
概况：当一个程序或者函数执行完毕后，所在执行上下文环境占的内存都会被垃圾回收机制回收，但是由于某些原因，部分内存没有被释放，就会导致内存泄漏
场景：
* 闭包
* 被遗忘的定时器
* 脱离的dom 引用
* 全局变量

解决方案：手动处理，规范正确的代码写法

----
### 什么是事件流
概念：页面接收事件的顺序,DOM包含三个阶段
* 事件捕获阶段
* 处于目标阶段
* 事件冒泡阶段

阻止事件冒泡： `event.stopPropagation()`
阻止默认行为：`event.preventDefault()`

----
### 什么是事件委托
概念：不在事件的目标上设置事件监听，而是设置在父元素，通过事件冒泡，父元素可以监听到子元素的事件触发，根据触发元素判断进行事件处理
示例：
```javascript
function onEven(eventType,parntNode,childNode,fn,bool){
    //没有委托
    let trifn;
    if(typeof childNode=='function'){
        bool = fn;
        trifn = childNode
    }else{
        //有委托
        trifn = function(e){
            let  target = e.target
            if(target.matches(childNode)){
                target['mapTarget'] = this;
                typeof fn=="function"&&fn.apply(target,arguments)
            }
        }
    }
    document.querySelectorAll(parntNode).forEach(function(itme){
        itme.addEventListener(eventType,trifn,bool||false)
    })
}
```
----
### new 一个对象 的操作 做了什么
* 新建一个空对象，继承了构造函数的原型链，执行构造函数并指向this为该对象，继承构造函数的属性和方法，如果函数执行的返回值类型为object 且不为null,返回该执行结果，否则返回新建对象

```javascript
function newTarget(target,...args){
    //新建一个空对象，继承target 的原型链
    let o = Object.create(target.prototype) ;
    //继承构造函数的属性和方法
    let res =  target.apply(o,args)

    //返回结果
    return typeof res =="object" ?res||o :o;

}
```

----
### 改变函数this 的指向 bind，apply，call的区别
区别：call 和apply 第一个参数是改变this，第二参数，接收参数不一样，apply为一个数组，call 为arg1,arg2...这样，两者调用会马上执行，bind 不会马上执行而是会返回一个新函数,参数用法和call一样

```javascript
//call 实现
Function.prototype.myCall = function(){

    //获取第一个参数
    let target = arguments[0]
    if(target==null ||target ==undefined){
        target = globalThis || window
    }else{
        target = Object(target);//包装类，避免传入基本类型
    }
    let args = [],len = arguments.length
    for(let i =1;i<len;i++){
        args.push(arguments[i] ) 
    }
    target.fn = this
    let val = eval('target.fn('+args+')')
    delete target.fn
    return val
}
//apply 实现
Function.prototype.myApply = function(){
    let target = arguments[0]
    if(target==null ||target ==undefined){
        target = globalThis || window
    }else{
        target = Object(target);//包装类，避免传入基本类型
    }
    let args = [],oldArgs = arguments[1]||[]
    for(let i =0;i<oldArgs.length;i++){
        args.push( oldArgs[i] ) 
    }
    target.fn = this
    let val = eval('target.fn(['+args+'])')
    delete target.fn
    return val
}
//bind 实现
Function.prototype.myBinds = function(){
     //获取第一个参数，要改变指向的this
    let context = arguments[0]
    if(context==null ||context ==undefined){
        context = globalThis || window
    }else{
        context = Object(context);//包装类，避免传入基本类型
    }
    context._fn_ = this
    //获取参数
    let args = [],len = arguments.length
    for(let i = 1;i<len;i++){
        args.push(arguments[i])
    }
    return function(){
        let jlen = arguments.length
        for(let j = 0;j<jlen;j++){
            args.push(arguments[j])
        }
        let res = eval('context._fn_('+args+')')
        delete context._fn
        args = null;
        return res
    }

}

```

----
###异步加载js 的方法
defer：只支持ie，如果js没有改变文档的操作，加上该属性可以加快文档处理
aysnc:H5新属性，主流浏览器支持，在IE中同时使用defer 和async,defer 优先级高

----

###ajax解决浏览器缓存
* 加时间戳
* 加随机数
* 设置请求头：setRequestHeader("If-Modified-Since","0")
* 设置请求头：setRequestHeader("Cache-Control","no-cache")

----

###防抖与节流
防抖：指事件在一定的事件内触发只执行一次，如果在指定时间内，重复触发事件，则重新计算执行时间
节流：减少事件触发频率，连续触发事件在一定时间内只执行一次

```javascript
//防抖
function debounce(fn,awit=1000,type=true){
    let timmer;
    return function(){
        let context = this;
        let args = arguments;
        if(timmer) clearTimeout(timmer)
        if(type){
            timmer = setTimeout(function(){
                fn.apply(context,args)
            },awit)
        }else{

            if(!timmer) fn.apply(context,args)
            timmer = setTimeout(function(){
                timmer = null
            },awit)
        }
    }

}

//节流
function throttle(fn,awit){
    let preveTime = 0;
    return function(){
        let context = this
        let args = arguments
        let nowTime = Date.now()
        if(nowTime-preveTime>=awit){
            fn.apply(context,args)
            preveTime = nowTime;
        }
    }

}
```

----


###js的垃圾回收机制
基本原理：由于javascript声明的变量需要的内存都是动态分配的,垃圾收集器会按照一定的时间周期和其他的一些策略来清除那些不在被使用的变量，释放内存
回收方法： 标记清除(主流)，引用计数
* 标记清除：就是当变量进入执行上下文环境，垃圾回收器会给这些变量做标志，比如进入环境标记，当执行栈离开改环境，环境变量中的变量就会被标志为离开环境，垃圾回收器会周期的扫描这些被标志不在被使用的变量进行清除，释放内存

* 引用计数：当声明一个变量，使用一个引用类型的值给该变量，改值会被计数1，如果该值又被另外一个变量引用，则改值计数+1，相反，如包含改值的变量又被重新赋值，则改值会被计数-1，当计数为0，说明改值已经没用，垃圾回收器会释放这些计数为0的值,弊端

###### v8的垃圾回收机制
* v8 GC用到的策略算法：分代回收,空间复制，标记清除，标记整理，增量标志
* 新生代区： V8 将堆分为新生代区和老生代区,新生代区主要为活跃周期端的对象，在新生代区，分为from-to 两个部分，所有标记对象在from空间，通过将标记的活跃的对象移动在to空间并排序整理，再将from空间的不活跃的对象清除掉，最后重新将to空间的活跃对象移动在form空间，达到回收释放内存的作用

* 老生代区： 在新生代区处理的对象经过一定条件会晋升在老生代区空间中，主要使用的标记清除，标记整理，和增量标记,标记清除会对老生代进行扫描标记，清除标志非活动对象，释放内容，但是空间碎片存在
标记整理就是空间碎片进行整理，增量标志是将GC回收的操作分成多段执行，因为垃圾回收的操作其实回阻塞程序的执行

----

### 写一个深度拷贝

```javascript
function deepcode(data){

    if(typeof data===null) return null
    if(typeof data!="object") return data ;//基本类型

    if(Object.prototype.toString.call(data)=="[object Date]") return data

    if(Object.prototype.toString.call(data)=="[object RegExp]") return data

    let result = {}
    if(Array.isArray(data)){
        result = []
    }
    for (const key in data) {
        const element = data[key];
        result[key] = deepcode(element);
    }

    return result;

}
```
----
### ==,===,Object.is() 的区别
* == : 运算符在判断相等前对两边的变量(如果它们不是同一类型) 进行强制转换
* === : 将数字 -0 和 +0 视为相等 ，而将Number.NaN 与NaN视为不相等.
* Object.is():  Object.is(-0，+0) =false  而 Object.is(NaN，NaN) = true

----

### 实现一个sleep延迟函数

```javascript
function sleep(awit=0){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(true)
        },awit)
    })
}
```

----

### 手写一个简单的Promise

```javascript
const STATE = { pending:0,fulfilled:1,rejected:2}
class PromiseM {
    constructor(fn) {
        this.state = STATE.pending
        this.resolveValue = undefined
        this.rejectValue = undefined
        this.resolveQuence = []
        this.rejectQuence = []

        this.resolve = (val) =>{
            if(this.state ===STATE.pending){
                this.resolveValue = val
                this.state = STATE.fulfilled
                this.resolveQuence.forEach(itme=>itme());
            }
        }

        this.reject =  (error)=> {
            if(this.state ===STATE.pending){
                this.rejectValue = error
                this.state = STATE.rejected
                this.rejectQuence.forEach(itme=>itme());
            }
        }
        try {
            fn(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }

    }
    then(fulfill, reject) {
        if (this.state === STATE.fulfilled) {
            fulfill(this.resolveValue)
        } else if (this.state === STATE.rejected) {
            reject(this.rejectValue)
        }else if(this.state ===STATE.pending){
            this.resolveQuence.push(()=>{
                fulfill(this.resolveValue)
            })

            this.rejectQuence.push(()=>{
                reject(this.rejectValue)
            })
        }
    }

}
```
----
### 写一个简易版的发布-订阅模式
```javascript
class LEvent{

    constructor(){
        this.quence = {}
    }

    on(eventName,callback){
        this.quence[eventName] =  this.quence[eventName] ||[]
        this.quence[eventName].push(callback)
    }

    emit(eventName,...args){
        this.error(eventName)
        this.quence[eventName].forEach(itme=>itme(...args))

        return this

    }

    off(eventName,callback){
        this.error(eventName)
        callback = typeof callback=="function"?callback:function(){}
        this.quence[eventName] = this.quence[eventName].filter(itme=>itme !=callback)

        return this
    }

    once(eventName,callback){
        const warpCallback = (...args)=>{
            typeof callback=="function"? callback.call(this,...args):null
            this.off(eventName,warpCallback)
        }
        this.on(eventName,warpCallback)
        return this
    }

    error(eventName){
        if(!this.quence[eventName]){
            throw new Error(`miss eventName is ${eventName}`)
        }
    }
}

let e = new LEvent()
function callback(val){
    console.log(val,'callback')
}
function callback1(val){
    console.log(val,'callback1')
}
e.on("lala",callback)
e.off("lala",callback)
e.once("lala",callback1)
e.emit("lala",1212)
e.emit("lala",45)

```

----
### DOM0级和DOM2级有什么区别
* DOM0: 将一个函数赋值给一个事件处理程序,有两种方式，在标签内绑定的事件，另一种设置属性值为一个函数指定为事件处理程序，一个事件类型只能写一个对应的事件处理程序，多个会被覆盖
* DOM2: 提供了两个事件处理方法，addEventListener()和removeEventListener(),一个事件类型可以同时处理几个事件程序，第三个参数，true:捕获，false:冒泡
* 事件流：捕获阶段 =》目标阶段 =》冒泡阶段
* 事件对象：常用的方法 event.stopPropagation()阻止事件冒泡，event.preventDefault取消默认事件

----