## 什么是jsx？
 jsx 是一个javascript 的语法扩展,具有javasript 的全部功能,可以很好描述ui 应该呈现它应有交互的本质形式,jsx 可以生成React 元素
通过Babel编译为React.createElement 方法

为什么要用jsx( 优点)
1. React 认为 渲染逻辑 本质与 其他Ui逻辑内在耦合 ,比如，要在ui 中绑定事件，在某些时刻状态更新变化需要通知UI
2. React 采用组件的松散耦合单元中，来实现关注点分离