//Дана строка '2+3 223 2223'. Напишите регулярку, 
//которая найдет строку 2+3, не захватив остальные

const { match } = require("assert");

let regular = new RegExp(/2\+3/g);
const dano = '2+3 223 2223';
console.log(dano.match(regular));