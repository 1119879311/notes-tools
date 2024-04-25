
const menuList = [{
    name: '首页',
    hide: false,
    children: [{
        name: '菜单1-1',
        hide: false,
        children: [{
            name: '孩子',
            hide: false
        }, {
            name: '孩子他爹',
            hide: false
        }, {
            name: '孩子他妈',
            hide: false
        }]
    },
    {
        name: '菜单1-2',
        hide: false,
        children: [{
            name: '孩子2',
            hide: false
        }, {
            name: '孩子他爹2',
            hide: false
        }, {
            name: '孩子他妈2',
            hide: false
        }]
    }]
}, {
    name: '首页2',
    hide: false,
    children: [{
        name: '菜单2-1',
        hide: false
    }, {
        name: '菜单2-2',
        hide: false
    }]
}]
//  const data = [
//     {name:1,hide:false,children:[
//         {name:1.1,hide:false,children:null},
//         {name:1.2,hide:false,children:[
//             {name:1.21,hide:false,children:null},
//             {name:1.22,hide:false,children:[
//                 {name:1.221,hide:false,children:null},
//                 {name:1.222,hide:false,children:null},
//                 {name:1.223,hide:false,children:null}
//                 ]},
//             {name:1.23,hide:false,children:null}

//             ]
//         },
//         {name:1.3,hide:false,children:[
//             {name:1.31,hide:false,children:null},
//             {name:1.32,hide:false,children:[
//                 {name:1.321,hide:false,children:[
//                     {name:1.3211,hide:false,children:null}
//                 ]},
//                 {name:1.322,hide:false,children:null}
//             ]}
//         ]},
//     ]},
   
//     {name:2,hide:false,children:[
//         {name:2.1,hide:false,children:[
//             {name:2.11,hide:false,children:null},
//             {name:2.12,hide:false,children:[
//                 {name:2.121,hide:false,children:[
//                     {name:2.1211,hide:false,children:null},
//                     {name:2.1212,hide:false,children:null}

//                 ]}
//             ]},
//             {name:2.13,hide:false,children:null},
//         ]},
//     ]},
// ]
// 实现思路：
//1. 先递归数组往下找，根据当前要匹配的字段fields的值如果和value 相等，找到要匹配当前value 所在的项，退出当前循环，把
// 把当前的项的属性kesy对应的值作为value 参数，递归循环，一层层往上找

// 递归法:根据子项的指定字段值找所有父级指定的字段值(rekeys的值)，比如所有父级id (这里不需要知道当前项的父级字段，如pid)



// function findTreeParendIds(data=[],value,fields,childrenKey='children'){
  

//    let recursion = (arrs=[],itmeId,parendId,fieldBool)=>{
//        for(let i=0;i<arrs.length;i++){
//            let itme = arrs[i]
//            if(itme[fields]===itmeId){ //已经匹配到目标值，往上递归
//                arrs[i].hide = false
//                if(parendId){
//                    console.log("找到匹配",arrs[i]);//往上递归
//                    recursion(data,parendId,null)
//                }
//                if(itme[fields]===value&&Array.isArray(itme[childrenKey])){////如果目标所在项,子级继续递归
//                    recursion(itme[childrenKey],itmeId,true,true);//往下走，不相等
//                }
//                // break;
//            }else{
//                //没有匹配到且没有匹配标识，继续递归
               
//                arrs[i].hide =fieldBool?false:true;//这里设置字段值
//                if(itme[childrenKey]&& Array.isArray(itme[childrenKey])){
//                    recursion(itme[childrenKey],itmeId,itme[fields],fieldBool)
//                }
//            }
         

//        }
//    }
//    recursion(data,value,null)

//    return data;
// }


/**
 * 
 * @param dataArr 数据源（数状结构tree）
 * @param value  要匹配的值
 * @param fields  与value 匹配的属性keys ,比如'name' ,'index' 字段
 * @param childrenKeys 子节点的属性，默认 children
 */

 function findTreeParendId(data=[],value,fields,childrenKey='children'){
    //利用第一次深层递归获取到父级的索引直接进行递归
    let recursionParent = (data=[],parentIndex=[])=>{
        let index = parentIndex.shift()
        if(index!==undefined){
            data[index].hide = false
            recursionParent(data[index].children,parentIndex)
        }
    }
    let recursion = (arrs=[],parendId,parendArrStr,fieldBool)=>{
        for(let i=0;i<arrs.length;i++){
            let itme = arrs[i]
            if(itme[fields]===value){ //目标找到
                arrs[i].hide = false
                if(parendId){
                    console.log("找到匹配",parendArrStr,arrs[i]);//往上递归 ,根据上级的索引进行出现
                    let parentIndex = parendArrStr.split("-").splice(1)
                    recursionParent(data,parentIndex)
                }
                //继续往下递归，目标项的所有子级
                if(Array.isArray(itme[childrenKey])){////如果目标所在项,子级继续递归
                    recursion(itme[childrenKey],null,true,true);//往下走，不相等
                }
            }else{
                arrs[i].hide =fieldBool?false:true;//这里设置字段值
                if(itme[childrenKey]&& Array.isArray(itme[childrenKey])){
                    recursion(itme[childrenKey],itme[fields],`${parendArrStr}-${i}`,fieldBool)
                }
            }
        }

    }
    recursion(data,null,'T')
    return data;
}
/**
 * 
 * @param dataArr 数据源（数状结构tree）
 * @param value  要匹配的值
 * @param fields  与value 匹配的属性keys ,比如'name' ,'index' 字段
 * @param cb 符合项 的回调函数 可选
 */
function treeParend(data,value,fields,cb){
    cb = typeof cb=="function"?cb:function(){}
    //目标找到，往回递归父级，根据第一次递归获取到父级所在层的索引
    let recursionParent = (data=[],parentIndex=[])=>{
        let index = parentIndex.shift()
        if(index!==undefined){
            data[index].hide = false
            cb&&cb(data[index])
            recursionParent(data[index].children,parentIndex)
        }
    }
    let recursion = (arr,parendArrStr,fieldBool)=>{
        arr.forEach((itme,index)=>{
            if(itme[fields]==value){
                console.log("找到匹配 和父级索引：",parendArrStr,itme);
                cb&&cb(itme)
                if(parendArrStr!==undefined){
                    let parentIndex =parendArrStr.toString().split("-")
                    recursionParent(data,parentIndex);//目标找到，往上递归
                }
                
               
                if(Array.isArray(itme.children)){ //继续往下递归，但是要做特殊标识，属于目标下级，设置第三给参数为true 即可
                    recursion(itme.children,null,true);
                }
            }else{ //没匹配到
                itme.hide =fieldBool?false:true;//这里设置字段值
                fieldBool&&cb&&cb(itme)
                if(Array.isArray(itme.children)){
                    parendArrStr = parendArrStr?`${parendArrStr}-${index}`:index  ;//这里往下递归，保存了父级的索引index
                    recursion(itme.children,parendArrStr,fieldBool)
                }
            }
        })
    }
    recursion(data)
    return data;
}
// console.log(treeParend(menuList,'菜单1-1',"name",function(itme){
//     // console.log("cb:",itme.name,itme)
// }))
// console.log(treeParend(data,2.121,"name",function(itme){
//     console.log("cb:",itme.name,itme)
// }))

/**
 * 
 * @param data 数据源（数状结构tree）
 * @param value  要匹配的值
 * @param targetFiled  与value 匹配的属性keys ,比如'name' ,'index' 字段
 * @param cb 符合项 的回调函数 可选
 */
function findTreeNode(data,value,targetFiled,cb){
     let result = {
         target:null,
         parendId:[],
         childId:[],
     }

    let findParendNodeId = (data=[],pidArr)=>{
        let index = pidArr.shift()
        if(index!==undefined){
            cb&&cb(data[index])
            result.parendId.push(data[index][targetFiled])
            findParendNodeId(data[index].children,pidArr)
        }
    }
    let eachNode = (arr,childBool,parentIndexStr)=>{
       if(!Array.isArray(arr)) return
       for (let index = 0; index < arr.length; index++) {
           
            let itme  = arr[index]
           
            if(itme[targetFiled]===value){ //找到目标值
                // console.log("找到目标",parentIndexStr)
                cb&&cb(itme)
                result.target = itme
                let parentIndex =parentIndexStr.toString().split("-");
                findParendNodeId(data,parentIndex);//递归父级
                eachNode(itme['children'],true) ;//递归子级

                break;
            }else{
                //递归
                if(childBool){ // 目标已找到,递归子级
                    cb&&cb(itme)
                    result.childId.push(itme[targetFiled])
                }

                // 找父级的索引index
                parentIndexStr = parentIndexStr?`${parentIndexStr}-${index}`:index  ;

                eachNode(itme['children'],childBool,parentIndexStr);//递归子级

            } 
           
       }
    }

    eachNode(data)

    return result

}
let res = findTreeNode(menuList,'菜单1-1',"name",function(itme){
    console.log(itme)
})
// console.log(res)
// let arr = [1,3,5,6]
// arr.forEach(itme=>{
//     console.log(itme)
//     if(itme===5){
//         break;
//     }
// })

