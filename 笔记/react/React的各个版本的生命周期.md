### React 的生命周在经历几个大版本更新都有不同的改变
[React 生命周期图解](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)


官方这个图分为两大部分 : v16.3 和 >=v16.4 ;
这里还要加多一个版本 >v17 


 ## 挂载
 一 v16、3 版本
    - constructor()
    - componentWillMount() [即将过时，在v17 版本弃用]
    - render()
    - componentDidMount()

 二 >=v16.4 版本
    - constructor()
    - static getDerivedStateFromProps() [新增] 
    - render()
    - componentDidMount()
 三 v17 版本 
    - constructor()
    - static getDerivedStateFromProps() [新增] 
    - UNSAFE_componentWillMount() [即将过时]
    - render()
    - componentDidMount()
   
 ## 更新
 一 v16、3 版本
  - componentWillReceiveProps [即将过时,在v17 版本弃用]
  - shouldComponentUpdate()
  - componentWillUpdate() [即将过时,在v17 版本弃用]
  - render()
  - componentDidUpdate()
二、>=v16.4 版本
 -  static getDerivedStateFromProps() [新增] 
 -  shouldComponentUpdate()
 -  render()
 -  getSnapshotBeforeUpdate() [新增]
 -  componentDidUpdate()
三 v17 版本 
 -  static getDerivedStateFromProps() 
 -  UNSAFE_componentWillReceiveProps() [即将过时]
 -  shouldComponentUpdate()
 -  UNSAFE_componentWillUpdate() [即将过时]
 -  render()
 -  getSnapshotBeforeUpdate() 
 -  componentDidUpdate()

 ## 卸载
 - componentWillUnmount()

## 错误
  >=16.4
  - static getDerivedStateFromError()
  - componentDidCatch()