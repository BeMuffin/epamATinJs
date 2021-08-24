//Создать 2 объекта: animal и cat, объект animal 
//добавить свойство move, объект cat должен наследовать свойство move

const animal = {
    move: true
}
const cat ={

}
cat.__proto__ = animal;
console.log(cat.move);