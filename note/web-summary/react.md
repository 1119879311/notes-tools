

## react15 的架构
 react的架构分为两层
 - 协调器(Reconciler) 负责找出变化的组件(diff)
 - 渲染器(renderer) 负责将变化的组件渲染到页面上
---
#### 协调器（reconciler）
react 可以通过 this.setState,React.forceUpdate,ReactDom.reader 触发更新
当触发更新的时候，协调器会做以下几个工作
- 调用函数组件或者class组件的render 方法，将返回的jsx 转为虚拟DOM
- 将虚拟DOM 与上一次更新的虚拟dom 进行对比(diff 策略)
- 找出要更新的虚拟DOM
- 通知渲染器(renderer)将变化的dom渲染在页面上
----
####  渲染器（renderer）
渲染器是跨平台的
- ReactDOM=>浏览器渲染
- ReactNative=>原生渲染
- ReactTest=>渲染出纯js 对象用于测试
### react15框架的缺点
在reconciler 中，mount 的组件会调用mountComponent,update 会调用updateComponent,这个都会精选递归子组件,递归更新的缺点：
- 一旦递归开始，无法中断，如果组件深层，递归更新超过16.6ms,就会操作卡顿，
## react16 的架构
react16的新架构
- 调度器(Scheduler)=>调度任务的优先级，优先级高的会优先进入协调器(Reconciler)
- 协调器（recomciler）=>负责找出变化的组件
- 渲染器（renderer）=>将变化的组件渲染在页面上
#### 调度器(Scheduler)
以浏览器是否有空余时间为标准，当浏览器有时间会通知我们，浏览器提供的API( requestldleCallbakc),
react考虑兼容性和触发频率不稳定等因素，自己实现了一个独立的库sceduler
#### 协调器(Reconciler)
react15 的递归处理虚拟DOm, React16 由递归改为可中断的循环过程，每次循环都会判断当前是否有shouldYield剩余时间
#### 协调器（Reconciler）内部使用Fiber架构

#### react16 如何解决渲染不完全的问题
react16的更新，协调器和渲染器不在是交替进行了，而是经过调度器找出优先的任务交给协调器后，会在内存中进行，给要更新的虚拟dom 打上标记（增删改），当所有组件完成Reconciler 后，才统一交渲染器，渲染器根据 虚拟Dom 的标记进行渲染更新


#### react 的渲染机制
- 首先 @bable/preset-react 会将在jsx传化为 reactElment的虚拟节点对象，其实就调用react.createElment 方法
- createElemnt 接收三个参数,type，config,children,config 其实就是节点熟悉，children 会变成一个数组，保存在props,没有节点都有$$typeof 是属性标记是否为合法的react元素，key属性唯一标志，ref保存真实dom,_onwer属于哪个组件的
-  调用reactDom 的render方法，创建一棵虚拟dome 树，然后映射在真实Dom中，在
