{
  var funcs = [];
  for (var i = 0; i < 10; i++) {
    funcs.push(
      // 立即执行函数
      (function (value) {
        // 返回一个函数
        console.log('---:' + value);
        return function () {
          console.log(value)
        }
      })(i)
    )
  }
  console.log('----')
  funcs.forEach(function (func) {
    func()
  })
}

{
  // const funcs = []
  // for (let i = 0; i < 10; i++) {
  //   funcs.push(function() {
  //     console.log(i)
  //   })
  // }
  // console.log('----')
  // funcs.forEach(func => func())
}
//

console.log('************************************ 函数柯里化 ************************************');
/**
 * 柯里化：
 *  又称部分求职，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数
 * 而且返回结果的新函数的技术
 *  当一个函数没有传入全部所需参数时，它会返回另一个函数（这个返回的函数会记录那些已经传入的参数），这种情况叫作柯里化
 *  */
function curry(fn) {
  // 返回一个函数
  return function (f) {
    // 调用函数,返回结果
    return fn(f);
  }
}

const _console = curry(function (x) {
  console.log(x);
});

_console('hello', 'word', 'this', 'is', 'zw');

const curring = function(fn) {
  const args = [].slice.call(arguments, 1);
  return function() {
    const newArgs = args.concat([].slice.call(arguments));
    return fn.apply(null, newArgs);
  }
}

const getWife = curring(function() {
  var allWife = [].slice.call(arguments);
  console.log(allWife.join(';'));
}, '合法老婆');
getWife("大老婆","小老婆","俏老婆","刁蛮老婆","乖老婆","送上门老婆");
getWife("超越韦小宝的老婆");

/**
 * 
 * js 函数允许通过函数 .length 属性访问参数数量
 * 函数的 .length 属性永远不会该拜年 - 该属性总是匹配函数的声明的参数的数量
 */
const showArges = (a, b, c) => {
  /**
   * arguments 变量包含函数调用时传递给该函数的所有参数的类数组列表（注意：不是数组）
   */
  const args = [].slice.call(arguments);
  // console.log('args:', args, ' length:', showArges.length);
}
// es6 简写，获取数据信息
const howMay = (...args) => {
  // console.log('args:', args, ' length:', args.length);
}
showArges(1,2,3,4);
howMay(1,2,3,4); // args: [ 1, 2, 3, 4 ]  length: 4

const add = (a, b) => {
  return a + b;
}
// es5 函数柯里化
let curriedAdd = curry(add);
// 定义占位符
var _ = '_';

function magician3(targetfn) {
  let num = 0;
  return function(f) {
    targetfn(num, f);
  }
}
curriedAdd = magician3(add);

// es6 函数柯里化
// const carryAdd = (a) => (b) => (c) => (a + b + c);
// console.log(add(1, 2, 3));
// console.log(curriedAdd(1)(2)(3));

// 使用闭包实现无限次求和
{
  const add = function(n) {
    // 闭包使用
    var sum = 0;
    var plus = function(n) {
      if(n) {
        sum += n;
        // 返回自己（函数）
        return plus;
      }
      return sum;
    }
    return plus(n);
  }

  console.log('无限次求和：', add(1)(2)(3)());
}

console.log('************************************** end ***************************************');