// 1 1 2 3 5 8 13 21 34

// fn(n) = fn(n-1) + fn(n-2)
// （斐波那契）

//非递归,利用一个数组保存，相加后的数据,最后返回数组索引最后一个的数据

function Fibonacci1(n){
    let arr = [1,1]

    if(n<=2) return 1

    for(let i =2;i<n;i++){
        arr[i] = arr[i-1]+arr[i-2]
    }
    console.log(arr)
    return arr[n-1]
}






//递归
function Fibonacci(n){
    return n<2?n: Fibonacci(n-1)+Fibonacci(n-2)
}

let res = Fibonacci1(12)
console.log(res)

