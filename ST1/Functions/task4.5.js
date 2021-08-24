//   Напишите функцию, которая определяет является ли число простым или нет
function isPrime (number){
    if (Math.sqrt(number) % 1===0) {return false};
    if (number %2 ===0) {return false};    

    for (let i =3;i<number;i++)
    {       
        if(number % i ===0) {return false};        
    }
    return number>1;     
}

console.log(isPrime(9));
