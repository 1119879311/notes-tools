// 找最大值

function findMaxValue(arr=[]){
    let res = null;
    arr.forEach(itme=>{
        if(itme>res){
            res = itme
        }

    })
    return res

}


console.log(findMaxValue([1,2,8,6,5,10,2]))