// // [6,5,1,3,8,4,2,4]
// //第一轮
//     // 第1次 5 和6 比=>5,6 第2次 6和1比=>5,1,6 .....
// //.....
// //1.相邻两两进行比较j
// //2. 每一轮比较后，最大的值排在最后，所以每一轮比较的次数都会减少，每一轮次数j = 数组长度len -1 - 当前匹配的轮数i
// function maopaoSort(arr){
//     var temp;
//     for(let i =0;i<arr.length-1;i++){//匹配轮数
//         for(let j =0;j<arr.length-1-i;j++){//每一轮匹配的次数
//             if(arr[j]>arr[j+1]){ //6,5 =>5,6
//                 temp = arr[j];//6
//                 arr[j] = arr[j+1];
//                 arr[j+1] = temp
//                 // [arr[j],arr[j+1]] = [arr[j+1],arr[j]];//快速交换
//             }
//         }
//     }
//     console.log(arr)
// }
// maopaoSort([6,5,1,3,8,4,2,4])



function maopao(arr){

    if(!Array.isArray(arr)||arr.length<1) return arr
    let tem;//临时变量
    let len = arr.length
    //外层遍历需要arr.length-1 次
    for(let i =0;i<len-1;i++){
        //内层遍历会每次少一次
        for(let j =0;j<len-1-i;j++){
            if(arr[j]>arr[j+1]){
                tem = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = tem
            }
        }
    }

    return arr


}

let res = maopao([6,5,1,3,8,4,2,4,14])
console.log(res)



