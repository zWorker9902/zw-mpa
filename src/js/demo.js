const dataArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log('********************************** slice end**************************************************');
/*
* slice(start, end)，返回一个新的数组，该方法可从已有的数组中返回选定的元素。
* start 负数表示获取末尾元素
* end 负数表示获取截止到末尾元素
* */
let newArray = dataArray.slice(-2);
console.log(newArray, dataArray);

newArray = dataArray.slice(5, -2);
console.log(newArray)

newArray = dataArray.slice();
console.log(newArray)

console.log('********************************** slice end**************************************************');
console.log('********************************** splice start**************************************************');
 /**
 * splice(-1)，数组中添加／删除元素，并返回被删除元素的数组。
 * 负数表示获取末尾元素
 * */
newArray = dataArray.splice(1, 0, 11, 12, 23);
console.log(newArray, dataArray);

newArray = dataArray.splice(-1);
console.log(newArray, dataArray);
console.log('********************************** splice end**************************************************');
console.log('********************************** 数组拷贝 **************************************************');

// slice
// concat

// 对象神拷贝
var deepCopy= function(source) {
  var result={};
  for (var key in source) {
    result[key] = typeof source[key]=== 'object' ? deepCoyp(source[key]): source[key];
  }
  return result;
}

console.log('********************************** 数组拷贝 **************************************************');
console.log('********************************** reduce start**************************************************');
console.log('dataArray:', dataArray);
/**
 * reduce 返回数组计算结果
 * 参数：
 * @param {function} 对每个元素的处理函数
 *  function(total, currentValue, currentIndex, arr) {}
 * @param {int} initialValue 初始值
 *
 * 使用：
 *  array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
 * */
const total = dataArray.reduce((total, currentValue, currentIndex, arr) => {
  // total 累加器，
  // 返回累加结果
  return total + currentValue;
}, 0);
console.log('total:', total);
console.log('********************************** reduce end**************************************************');
console.log('**********************************JS函数式编程中compose的实现**************************************************');
/**
 * Javascrip中每个函数都会有一个 Arguments 对象实例 arguments，
 * 它引用着函数的实参，可以用数组下标的方式"[]"引用arguments的元
 * 素。arguments.length为函数实参个数，arguments.callee引用函
 * 数自身。
 *
 * arguments对象和Function是分不开的。因为arguments这个对象不能
 * 显式创建，arguments对象只有函数开始时才可用。
 *
 * arguments对象并不是一个数组,但是访问单个参数的方式与访问数组元
 * 素的方式相同
 *
 * callee 属性是 arguments 对象的一个成员，仅当相关函数正在执行时才可用。
 callee 属性的初始值就是正被执行的 Function 对象，这允许匿名的递归函数
 * */

function compose() {
  var fns = [].slice.call(arguments)
  return function (initialArg) {
    var res = initialArg
    for (var i = fns.length - 1; i > -1; i--) {
      res = fns[i](res)
    }
    return res
  }
}

function pipe() {
  var fns = [].slice.call(arguments)
  return function (initialAgr) {
    var res = initialAgr
    for (var i = 0; i < fns.length; i++) {
      res = fns[i](res)
    }
    return res
  }
}

var greet = function (name) {
  return 'hi:' + name;
}
var exclaim = function (statement) {
  return statement.toUpperCase() + '!';
}
var transform = function (str) {
  return str.replace(/[dD]/, 'DDDDD');
}

var welcome1 = compose(greet, exclaim, transform);
var welcome2 = pipe(greet, exclaim, transform);
console.log(welcome1('dot'))//hi:DDDDDOT!
console.log(welcome2('dolb'))//HI:DDDDDOLB!

console.log('********************************** compose end**************************************************');