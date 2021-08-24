//В терминале оплаты сохранено ваше имя, напишите функцию для определения имени в 
//терминале(если вы ввели ваше имя, то привет + имя, если нет, то нет такого имени)
const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  r1.question(`What's your name? `, (name) => {
    if (name == "Anna"){
        console.log(`Hello ${name}!`)
    } 
    else{
        console.log ('Name not found!')
    }
    r1.close()
  });