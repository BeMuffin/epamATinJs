const { Console } = require("console");

const car = {
    color: 'black'   
    
};
car.color='green';
car.power = function(number){ 
    console.log(`Мощность двигателя ${number} Вт`);
    
}
car.power(500);
