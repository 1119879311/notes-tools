// 实现一个history 路由
// 通过 h5 的api history.pushState,history.replaceState，history.state 实现
// pushState 将一个真实的地址url添加在浏览器的历史记录
// replaceState 将历史记录中的当前地址替换掉
// state  返回当前状态对象

//如何监听 history 路由改变
//改变history 路由的方式有： 浏览器的前进后退(popstate监听)，a 标签(拦截默认事件),pushState 和replaceState (适配模式对外提供接口调用)


// HistoryRouter 类
//push 方法代替 pushState
//replace 方法代替 replaceState
//resigter注册路由
//on 监听路由改变(发布订阅模式)


class HistoryRouter{


    constructor(){
        this.routers=[]
        this.listenerLink()
        this.listenerState()
    }
    //监听popstate
    listenerState(){
        window.addEventListener("popstate",(e)=>{
            let state = e.state ||{}
            let path = state.path||''

            this.hander(path)


        },false)

    }

    //监听a链接
    listenerLink(){
        window.addEventListener("click",(e)=>{
            let dom = e.target
            let href = dom.getAttribute("href")
            if(dom.tagName=="A" && dom.getAttribute("mode")==="spa" && href){
                e.preventDefault();//禁止默认行为，跳转

                this.push(href)

            }
        },false)
    }
    push(path){
        history.pushState(null,null,path)
        this.hander(path)
    }
    replace(url){
        history.replaceState({url},null,url)
    }

    register(url,callback){
        this.routers[url] = callback
    }

    //重定向,匹配不到指定一个
    redirect(callback=function(){}){
        this.routers["404"] = callback;
    }
    //路由错误
    registerError(callback=function(){}){
        this.routers['error'] = callback || function(){}
    }

    init(){
        let pathname = location.pathname
        console.log("init",pathname)
        this.hander(pathname)
    }

    hander(path){
        let hander;

        //不存在
        if(!this.routers.hasOwnProperty(path)){
            hander = this.routers['404'] || function(){}
        }else{
            hander = this.routers[path]
        }

        try {
            console.log(hander)
            hander.call(this)
        } catch (error) {
            (this.routers['error'] || function(){}).call(this,error)
        }
    }

}
