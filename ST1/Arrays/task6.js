//Отфильтровать массив [1,6,7,8,3,4,5,6] по значению >3

const arr = [1,6,7,8,3,4,5,6]
const newArr = arr.filter(number => number>3);
newArr.forEach(number=>{console.log(number)});