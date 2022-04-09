//使用window.addEventListener("hashChange",hander,false) 监听

class HashRouter{


    constructor(){


        this.routers = {}

        window.addEventListener("hashchange",this.loadRouter.bind(this),false)

    }

    //匹配不到重定向
    redirect(callback){
        this.routers[redirect] = callback
    }

    //路由错误
    routerError(){
        this.routers["error"] = callback

    }
    //注册路由
    registerRouter(name,callback){
        if(name && typeof name =="string"){
            this.routers[name] = callback
        }
       
    }

    //加载路由
    loadRouter(){
        //获取hash  # 后面的值

        let hash = location.hash.slice(1)
        let hander;
        if(!hash){
            hander =this.routers['redirect'] || function(){}
        }else if(this.routers.hasOwnProperty(hash)){ //
            hander = this.routers['redirect'] || function(){}
        }else{
            hander = this.routers[hash]
        }

        try {
            hander.apply(this)
        } catch (error) {
            (this.routers["error"] || function(){}).call(this,error)
        }


    }

}