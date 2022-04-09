
```javascript
//小数变整数相加
//取两个数中小数点后位数最多(长度)len,作为10 的幂次方 Math.pow(10,小数点后位数) U ;10 的0次=>1，10 的1次=》10 。。。
//将两个数分别乘以 U 倍使之成为整数便于相加（整数相加）
//最后将相加的结果再除以 U 倍 得到预期结果
//实现
/**
 *
 * @param {*} num1
 * @param {*} num2
 * @param {*} type  加减
 * @returns
 */
function accuracy(num1, num2, type) {
  let useDecimalLen = function (num) {
    try {
      let str = num.toString().split(".")[1];
      return str ? str.length : 0;
    } catch (error) {
      return 0;
    }
  };
  let len1 = useDecimalLen(num1);
  let len2 = useDecimalLen(num2);
  let maxLen = Math.pow(10, Math.max(len1, len2));
  if (type == "+") {
    return (num1 * maxLen + num2 * maxLen) / maxLen;
  } else if (type == "-") {
    return (num1 * maxLen - num2 * maxLen) / maxLen;
  }
  throw "type params must string is + or -";
}
let res = accuracy(0.3, 0.1, "-");
console.log(res, 0.3 - 0.1);

```