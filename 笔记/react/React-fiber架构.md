# Fiber : 也称为虚拟DOM

- Fiber 的含义(三层含义)
  
#### 1、作为架构来说,React15 的Reconciler 采用递归方式进行，数据保存在递归栈中，所以称为stact Reconciler，React16 的Reconciler 基于全新的Fiber节点实现，所以称为Fiber ReconcIler 

```javascript

//结构
this.return = null
this.child = null
this.sibling = null
this.index = 0
this.ref = null

```


#### 2、作为静态数据结构来说，每个Fiber 节点对应一个React Element, 保存该组件的类型(函数组件，类组件和原生组件) 对应的DOM 节点等信息

```javascript
//结构

// Fiber 对应组件的类型： Function | Class | Host(原生)
this.tag = tag

this.key = key

//大多数同type 属性一致，特殊：如FunctionComponent 使用React.memo 包裹
this.elementType = null

// FunctionComponent 指向函数本身，ClassComponent指向class,HostComponent 指向DOM 节点的TagName
this.type = null

//Fiber 对应的真实DOM 节点
this.stateNode = null

```
#### 3、作为动态的工作单元来说，每个Fiber 节点保存了本次更新中该组件改变的状态，要执行的工作(删除，插入，更新)



# Fiber架构的工作原理 :双缓存Fiber树
   
  - 双缓存： 在内存中构建并直接替换的技术叫双缓存

 1、在React 中最多同时存在两颗Fiber树，当前屏幕显示的内容对应的Fiber数称为Current Fiber 树
 正在内存中构建的Fiber 树称为 workInProgress Fiber树,他们通过alternate 属性连接


```javascript

currentFiber.alternate = workProgressFiber
workProgress.alternate = currentFiber

```

2、React 应用的根节点通过使用current 指针在不同的rootFiber 间切换来完成current Fiber 树指向的切换,
当workInProgrees fIber 树构建完成交给Renderer 渲染在页面上后，应用根节点的current Fiber 指针就指向workInProgerss Fiber 树

3、此时 workInProgerss Fiber 就变为current Fiber 树,每次更新，都会产生新的 workInProgress Fiber ，通过current 与workInPorgress 的替换，完成DOM 更新



	
  



