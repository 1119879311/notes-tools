

/**
 * list:Array<number>
 * target:number
 * @returns [number,number] 返回两个之的下标
 * 
 * 要求：Array 的值只能使用一遍
 * 思路:使用哈希Map，空间换时间
 */
 //[1,2] ,3

 function towSum(arr,sum){

    if(!Array.isArray(arr) || arr.length<2) return -1

    let len = arr.length
    let map = new Map()
    map.set(arr[0],0)

    for(let i = 1;i<len;i++){
        let data = sum - arr[i]

        if(map.has(data)){
            return [ map.get(data),i ]
        }
        map.set(arr[i],i)
    }
    return -1
 }
 console.log(towSum())
 console.log(towSum([1,2,8],10))






//  function towSum(list=[],target=0){
//     let len = list.length
//     if(len<2) return -1;

//     let map = new Map()
//     map.set(list[0],0);

//     for (let index = 1; index < len; index++) {
//        let outval = target - list[index];//1
//        if(map.get(outval)!==undefined){
//            return [map.get(outval),index]
//        }
//        map.set(list[index],index);
        
//     }
//     return -1

//  }
//  console.log(towSum())
//  console.log(towSum([1,2,8],10))
