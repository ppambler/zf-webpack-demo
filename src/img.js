// file-loader 默认会在内部生成一张图片，而且带有hash戳，然后把这张图片搞到build目录里边去
// 把图片也当作是一个模块。
// 把图片引入，返回的结果是一个新的图片地址
import img from "./300-200.jpg";

let image = new Image();

console.log(img); //d89b96786c4d4f20bc340ffce94107fd.jpg

image.src = img; //就是一个普通的字符串

document.body.append(image);
