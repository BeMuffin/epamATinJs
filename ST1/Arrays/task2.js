//Дан массив производителей автомобилей, преобразовать массив в строку и обратно в массив

const cars = ['Volkswagen','Skoda','Kia','Honda','Mitsubushi'];
const carsStr = cars.join();
console.log(carsStr);
const newCars = carsStr.split(',');
newCars.forEach(car => console.log(car));

