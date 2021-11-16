//Дан массив имен ваших знакомых, добавить к каждому элементу массива слова hello

const friendName = ['Ann','Maria','Lera','Artem']
const newFriendArr = friendName.map(function(friend){return 'Hello '+friend})
newFriendArr.forEach(friend =>console.log(friend));
