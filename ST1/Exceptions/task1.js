//В try catch конструкцию завернуть код: console.log(a), let a = 3. 
//И вывести ошибку – ‘let перед использованием нужно объявить’. 
//При выполнении 1/0  выводить ошибку 'на ноль делить нельзя'

const { Console } = require("console");
console.log('Исключение 1')
try{
    console.log(a);
    let a = 3;
}
catch(e){
    console.log('let перед использованием нужно объявить')
}

console.log('Исключение 2')

try{
    const a = 1;
    const b = 0;
     a/b;
    throw (e);
}
catch(e){
    console.log('Попытка поделить на 0')
}