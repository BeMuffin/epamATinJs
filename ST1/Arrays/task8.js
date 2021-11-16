//Реализовать цикл, который будет выводить число а, пока оно не станет меньше 10

const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  let a=0;
  r1.question(`Input a number: `,(number) => {
     a = number;
     while (a>10)
     {
       a--; 
       console.log(a);
     }
   
    r1.close();

  });
    
 
        
        
    

   
  
  