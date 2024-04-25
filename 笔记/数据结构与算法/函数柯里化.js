//柯里化 简单示例1
function curringTest(x) {
  return function (y) {
    return x + y;
  };
}
curringTest(1)(2);

//柯里化 简单示例2 ,接收一个函数

function curring(fn) {
  //获取第一个函数的参数
  let args = fn.length;
  console.log("args", args);
  const currind = (...arg1) => {
    return arg1.length >= args
      ? fn(...arg1)
      : (...arg2) => currind(...arg1.concat(arg2));
  };

  return currind;
}

const listMerge = (a, b, c) => a + b + c;
const curried = curring(listMerge);
console.log(curried(1)(2)(3)); // [1, 2, 3]

console.log(curried(1, 2)(3)); // [1, 2, 3]

console.log(curried(1, 2, 3)); // [1, 2, 3]

//经典面试题: 累加
//1. 每次执行重新返回一个函数,同时收集参数
//2. 改写函数的toString 方法，隐式转化，
function add() {
  //获取第一次执行的函数
  let _args = Array.prototype.slice.call(arguments);
  console.log(_args);

  // 声明一个函数
  let _adder = function () {
    _args.push(...arguments);
    console.log("_args", _args);
    return _adder;
  };
  _adder.toString = function () {
    return _args.reduce(function (a, b) {
      return a + b;
    });
  };
  return _adder;
}

let a = add(1, 2, 7)(3);
console.log(a);
