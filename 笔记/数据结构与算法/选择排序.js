
//选择排序
/**
 * 思路：拿到外层遍历每一次的第一项，然后和后面索引的所有的数据进行大小比较，当一轮遍历完，找到最小值的索引，进行数据交换
 * 每一轮遍历后，最小值排在前面
 * @param {*} arr 
 * @returns 
 */

function selectSort(arr){

    if(!Array.isArray(arr) || arr.length <1) return arr

    let len = arr.length
    //外层遍历arr.length-1次
    for(let i =0;i<len;i++){
        let currentIndex = i;
        for(let j =i+1;j<len;j++){
            if(arr[currentIndex]>arr[j]){
                currentIndex = j;
            }
        }

        //找到要交换的索引
        if(currentIndex !==i){
            // let tem = arr[currentIndex]
            // arr[currentIndex] = arr[i]
            // arr[i] = tem;
        
            [arr[i],arr[currentIndex]] = [arr[currentIndex],arr[i]];//快速交换

        }
        
       

    }
    return arr;

}

let res = selectSort([6,5,1,3,8,4,2,4])
console.log(res)















//1.思路：默认取每轮的第一个值，和后面所有值匹配，找出最小/最大值比较进行交换,每次循环匹配次数为 n-i-1;
// 5》6  5, 6
// 5》1  1,6,5
//。。。。
//第二次i=2 二位开始 ,匹配6次 j=6=> Array.length-1-i
    //1
    // function xuanzeSort(arr){
    //     var tem,minIndex;
    //     for(let i =0;i<arr.length-1;i++){
    //         minIndex=i;//必须重置minIndex，因为可能没有找对比小的值
    //         for(let j = i+1;j<arr.length;j++){
    //             if(arr[minIndex]>arr[j]){
    //                 minIndex = j;
    //             }
    //         }
    
    //         if(i!==minIndex){ //说明找到比它小的值
    //             tem = arr[minIndex];
    //             arr[minIndex] = arr[i]
    //             arr[i] = tem
    //         }
    //     }
    //     console.log(arr)
    // }
    // xuanzeSort([6,5,1,3,8,4,2,4])

    