//Написать функцию, которая принимает два параметра - 
//массив и число и выводит индекс элемента массива равный числу

const findIndexOfArray = (arr,number) => {

    return arr.findIndex(elem => elem==number)

}

const arr =[1,2,9,6,7,5,6,7];
console.log(findIndexOfArray(arr,5));

