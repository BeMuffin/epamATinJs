// Реализовать цикл, который выводит в консоль простые числа


function isPrime (number){
    // if (Math.sqrt(number) % 1===0) {return false}; 

    if (number %2 ===0) {return false};  

    for (let i =3;i<Math.sqrt(number)/1;i++)
    {       
        if(number % i ===0) {return false}; 
    }
    return number>1;       
}

for (let i=3; i<100;i++){

    if (isPrime(i)==true){console.log(i);}
}



