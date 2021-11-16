const string = "string";
const bool = true;
const number = 123;

console.log(typeof(string+bool)); //string 
console.log(typeof(string+number));//string
console.log(typeof(number+bool));//number

console.log(typeof(string*bool)); //number
console.log(typeof(string*number)); //number
console.log(typeof(number*bool));//number

console.log(typeof(string/bool));//number
console.log(typeof(string/number));//number
console.log(typeof(number/bool)); //number

console.log(typeof(String("str")+Boolean('false'))); //string
console.log(typeof(String("123")+Number('9'))); //string
console.log(typeof(Number('5')+Boolean('true'))); //number

console.log(typeof(String('15')*Boolean('true'))); //number
console.log(typeof(String('NOOO')*Number('1'))); //number
console.log(typeof(Number('0')*Boolean('false')));//number

console.log(typeof(String('YES')/Boolean('true')));//number
console.log(typeof(String('Hi!')/Number('14')));//number
console.log(typeof(Number('1')/Boolean('true'))); //number

