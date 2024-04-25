//找出两个数的最大公约数
//7 14 => 7

//5 9 =>1

function maxCommonSipor(num1,num2){

    let max = Math.max(num1,num2)

    let min = Math.min(num1,num2)

    if(max % min ==0) return min ;//优化，可能性之一

    let sum = 2;
    let result = 1
    while(sum<min){ //优化，可以从最小值的，开始对分，先向上递增到最小值找，如果找到直接返回，如果没找到，继续从对分的开始向下递减找，最后递减为1

        if(num1 % sum==0 && num2 % sum==0){

            result = sum
        }
        sum++

    }

    return result

}

let res = maxCommonSipor(14,6)
console.log(res)