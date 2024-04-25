//快速排序:1.取数组中间值，然后对数据进行迭代，对数组分成两组
//2.第一轮遍历完，，比中间值小的。分左边一组，比中间值大的分右边一组
//3. 进行递归，对上轮分成的两组进行递归，先递归左边组，然后合并中间值，再进行合并 递归右边的
//4.如果递归分组中元素只有一个，就直接返回

//快速排序，
//思路：
//找一个基准值，然后进行遍历，比基准值小的放在左边的队列，大的放在右边的队列，当遍历完成后，基准值处于两个队列的中间，合拼队列后返回
//将左右队列重复1 进行递归分队


function fastSort(arr){

    if(!Array.isArray(arr) || arr.length<=1) return arr


    let baseNum = arr[0];//基准值

    let minQunce = [];//比基准值 小的队列
    let maxQunce = [];//比基准值 大的队列


    //进行一轮遍历来分队

    for(let i=1;i<arr.length;i++){
        if(baseNum>=arr[i]){
            minQunce.push(arr[i])
        }else{
            maxQunce.push(arr[i])

        }
    }
    // console.log("minQunce",minQunce,"maxQunce",maxQunce,'baseNum',baseNum)
    //分队完成后，都得到两个 队列数据minQunce,minQunce ,还有一个基准值
    //对两个队列数据进行重复操作递归
    let res =  fastSort(minQunce).concat([baseNum],fastSort(maxQunce))
    console.log(res,'--')
    return res

}

let res = fastSort([6,5,1,3,8,4,5,2,4,9])

console.log(res)




// function fastSort(arr){
//     // 如果数组元素只有一个直接返回
//     if(arr&&arr.length<=1){
//         return arr;
//     }
//     //2. 取中间值，直接用splice，删除原数组的中间值，返回删除的中间值
//     let centerVal =arr.splice( Math.floor(arr.length/2),1)[0];
//     console.log(centerVal)
//     //3. 声明存储左右分组的变量
//     let leftArr = [],rightArr=[];
//     //4。 遍历数据进行分组
//     for(let i = 0; i<arr.length;i++){
//         if(centerVal>arr[i]){
//             leftArr.push(arr[i])
//         }else{
//             rightArr.push(arr[i])
//         }
//     }
   
//     // 5. 对左右分组继续递归排序分组
//     return fastSort(leftArr).concat([centerVal],fastSort(rightArr))
// }

// var arr = [6,5,1,3,8,4,5,2,4]
// console.log(fastSort(arr))
// function fastSortTwo(arr,start,end){
//     if(start>end){
//         return
//     }
//     let i,j,tem;
//     i=start;
//     j = end;
//     tem = arr[i];
//     while(i<j){

//         // 从右找比基准值大的值==》
//         while(i<j&&arr[j]>tem){
//             j--;
//         }
//         if(i<j)
//         arr[i++] =arr[j];

//         //从左找比基准值小的值《==
//         while(i<j&&arr[i]<tem){
//             i++
//         }
//         if(i<j){
//             arr[j++] = arr[i]
//         }
    
//     }
//     arr[i] = tem;
//     fastSortTwo(arr,start+1,i-1)
//     fastSortTwo(arr,i+1,end)
// }

// var arr1 = [6,5,1,3,8,4,5,2,4]
// fastSortTwo(arr1,0,arr1.length)
// console.log(arr1)
