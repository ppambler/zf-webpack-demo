// import "@babel/polyfill";

require("@babel/polyfill");

class B {}

function* gen(params) {
  yield 1;
}

console.log(gen().next());

[1, 2, 3].includes(2);

module.exports = "我是模块a";

// export default "我是模块a";
