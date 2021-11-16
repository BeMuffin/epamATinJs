//Преобразовать числовой массив в Boolean

let arrOfNumber = [15,55,32,-4,0,-2,-6];
arrOfNumber = arrOfNumber.map((number) => !!number);
arrOfNumber.forEach(elem => console.log(elem));