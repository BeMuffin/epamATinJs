//Дана строка 'ahb acb aeb aeeb adcb axeb'. 
//Напишите регулярное выражение, которое найдет строки ahb, acb, aeb по шаблону:
// буква 'a', любой символ, буква 'b'

const { match } = require("assert");

let regular = new RegExp(/a.b/g);
const dano = 'ahb acb aeb aeeb adcb axeb';
console.log(dano.match(regular));