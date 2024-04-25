#### 驼峰和下划线命名转换
```javascript
// 下划线换驼峰
function _Tranform(str){
    if(typeof str !=="string") return str
    let reg = /_([a-z])/g
    let res = str.match(reg)
    if(!res){
        return str
    }
    res.forEach(itme=>{
       str =  str.replace(itme,itme[1].toLocaleUpperCase())
    })
    return str

}

//驼峰转下划线
function tranfrom_(str){
    if(typeof str !=="string") return str
    return str.replace(/\B([A-Z])/g,"_$1").toLowerCase()
}

function toTranformObj(obj,type){
    if(typeof obj !="object" || obj ===null) return obj
    let res = {}
    let tranfromFn = type?_Tranform:tranfrom_
    for (const key in obj) {
        console.log(key)
        res[tranfromFn(key)] =toTranformObj(obj[key])
        
    }
    return res
}
```
#### 解决小数点精度问题
```javascript
/** 取两个数中小数点后位数最多(长度)len,作为10 的幂次方 Math.pow(10,小数点后位数) U ;10 的0次=>1，10 的1次=》10 。。。
    将两个数分别乘以 U 倍使之成为整数便于相加（整数相加）
    最后将相加的结果再除以 U 倍 得到预期结果
**/
/**
 * 
 * @param {*} num1 
 * @param {*} num2 
 * @param {*} type  加减
 * @returns 
 */
function accuracy(num1,num2,type){
    
    let useDecimalLen = function(num){
        try {
            let str =  num.toString().split(".")[1];
            return str?str.length:0
        } catch (error) {
            return 0
        }
    }
    let len1 = useDecimalLen(num1)
    let len2 = useDecimalLen(num2)
    let maxLen = Math.pow(10,Math.max(len1,len2))
    if(type=="+"){
        return (  num1 * maxLen + num2 * maxLen ) / maxLen
    }else if(type=="-"){
        return (  num1 * maxLen - num2 * maxLen ) / maxLen
    }
    throw "type params must string is + or -"
    
}

```


#### 防抖与节流

#### 一维数组树状结构
```javascript
/**
 * 
 * @param {*} data  数据源
 * @param {*} idFiled  每一项唯一id字段 默认id
 * @param {*} pidFiled 父级字段 默认__pid__
 * @param {*} pidValue 父级的值默认0开始
 * @param {*} leve 层级 1开始 
 * @returns 
 */
 function arrayToTree(data,idFiled="id",pidFiled="__pid__",pidValue=0,leve=1){
    if(!Array.isArray(data)) return data
    let copeData = JSON.parse(JSON.stringify(data))
    let result = new Array();
    copeData.forEach((itme,index)=>{
        if(itme[pidFiled]==pidValue){
            itme['__leve__'] = leve
            itme['children'] = arrayToTree(copeData,idFiled,pidFiled,itme[idFiled],leve+1)
            result.push(itme)
        }
    })
    return result
    
}
```

#### 树状结构转一维数组
```javascript
/**
 * 
 * @param {*} data  数据源
 * @param {*} childKey  子级字段默认children
 * @param {*} addFiled  要哪个字段作为 父级pid 的值
 * @param {*} pid 为每一个添加pid字段的值 默认0开始，改值为 字段对应的addFiled
 * @param {*} cb 回调函数
 * @returns 
 */
function TreeToArray(data,childKey='children',addFiled="id",pid=0,cb){
    let resArr = [];
    cb = typeof cb=="function"?cb:function(){}
    if(!Array.isArray(data)) return data
    let copeData = JSON.parse(JSON.stringify(data))
    copeData.forEach(itme=>{
        let childs = itme[childKey]
        delete itme[childKey];
        resArr.push(itme);
        itme['__pid__'] = pid
        cb(itme)
        resArr = [].concat(resArr,TreeToArray(childs,childKey,addFiled,itme[addFiled],cb))

    })
    return resArr
}


```


#### 从一个树状结构找出指定项，包含指定项所有父级id(其他字段值) 和下级id(其他字段值)
```javascript
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

```


#### 深拷贝

```javascript
function deepcode(obj){
    let newobj={};
    if(typeof obj=="object"&&obj==null) return null
    if(typeof obj!="object") return obj
    if(Object.prototype.toString.call(obj)==="[object Date]") return obj
    if(Object.prototype.toString.call(obj)==="[object RegExp]") return obj
    if(Array.isArray(obj)){
        newobj = []
    }
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            newobj[key] = deepcode(obj[key])
        }
    }
    return newobj

}

```

#### 事件订阅

#### 写一个任务队列