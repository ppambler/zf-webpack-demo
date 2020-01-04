// let str = require("./a.js");
// console.log(str);

require("./b.js");

require("./index.css");

require("./index.less");

let fn = () => {
  console.log("我是箭头函数");
};

fn();

@log
@nextAlphabet
class A {
  //var o = new A() o.a=1，这是es7语法
  a = 1;
}

var o = new A();

console.log(o.a);
o.nextAlphabet();
console.log(o);

function log(target) {
  console.log(target);
}

function nextAlphabet(target) {
  target.prototype.nextAlphabet = () => {
    console.log("B");
  };
}
