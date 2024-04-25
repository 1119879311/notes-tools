//什么是素数(质数)，只能被自身和1整除，1 不是素数

function isPri(n){
    if(n==0 || n==1) return false

    if(n==2||n==3) return true

    let sqrt = Math.sqrt(n)

    for(let i=2;i<=sqrt;i++){
        if(n%i==0){
            console.log(`能被 ${i}整除，${n}不是素数`)
            return false
        }
    }

    return true

}
let arr = Array.from(new Array(100),(_,v)=>v+1)
let result = isPri(17)

let isresult = arr.filter(isPri)

console.log(result)
console.log(isresult)