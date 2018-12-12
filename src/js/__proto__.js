
/**************************************************************************************************************/
// Object.setPrototypeOf方法的作用与__proto__相同，用来设置一个对象的prototype对象。它是 ES6 正式推荐的设置原型对象的方法。
// Object.setPrototypeOf(object, prototype);

let proto = {};
const obj = { x: 10 };
// 将proto对象设置为obj对象的原型，所以从obj对象可以获取proto对象的属性
Object.setPrototypeOf(obj, proto);

function Reactangle() {

}
// Object.getPrototypeOf(object) 获取对象的原型
var rec = new Reactangle();

console.log(Object.getPrototypeOf(rec) === Reactangle.prototype); // true
rec.__proto__ = Object.prototype;
Object.setPrototypeOf(rec, Object.prototype);

// Reactangle.prototype.isPrototypeOf(rec) 判断rec的原型是否为Reactangle.prototype
console.log(Reactangle.prototype.isPrototypeOf(rec)); // false

// 说明 Function 继承 Object，所以Function的原型是Object
console.log(Object.prototype.isPrototypeOf(Function.prototype)) // true

console.log('prototype:', Object.getPrototypeOf(obj) );

proto = obj
// 获取对象原型
while (Object.getPrototypeOf(proto) !== null) {
  console.log('proto:', proto );
  proto = Object.getPrototypeOf(proto)
}
console.log('proto:', proto);
console.log('proto:', Object.getPrototypeOf(proto));

const array1 = [1, 2, 3, 4];
const object = [];
const string1 = '你好';

console.log(Array.prototype.isPrototypeOf(array1));
console.log(Object.prototype.isPrototypeOf(object));
console.log(typeof(array1));
console.log(typeof(object));
console.log(typeof(string1));

/**************************************************************************************************************/
/**
 * typeof  - 一元操作符、获取变量、表达式类型的字符串，一般只返回如下几个结果：
 *  number、boolean、string、function、object（null, array, object)、undefined
 *
 * **/
console.log('********************************** typeof start**************************************************');
console.log(typeof(123)); // number
console.log(typeof(true), typeof(false)); // boolean boolean
console.log(typeof("abcd")); // string
console.log(typeof(() => {})); // function

console.log(typeof(null), typeof([1, 2, 3, 4]), typeof({ a: 1 })); // object object object

console.log(typeof(a), typeof(undefined)) // undefined undefined

// 判断a对象是否存在
console.log(typeof a === 'undefined')
// console.log(!!a) // 这种方法在 a 没有声明时可能会报错，

// 截取指定位数的字符串
console.log(Object.prototype.toString.call(obj).slice(8, -1)) // object

console.log('********************************** typeof end**************************************************');

/**************************************************************************************************************/
/**
 * instanceof  - 判断变量是否为某个对象的实例：
 * **/
console.log('********************************** instanceof start**************************************************');
const array = new Array();
console.log(array instanceof Array, array instanceof Object); // true true 因为Array是object的子类

function test1() {}
const b = new test1();
console.log(b instanceof test1); // true
console.log(b instanceof Array); // false
console.log(b instanceof Object); // true
console.log(b instanceof Function); // false

console.log('********************************** instanceof end**************************************************');
