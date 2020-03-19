const a = 10; //a este numar
const b = '10'; //b este sir de caractere

console.log(a == b); //true
console.log(a === b); //false

const c = 'abc';
const d = 'abc';

console.log(c == d); //true
console.log(c === d); //true

const fals = false; //boolean
const str = ''; //string
const zero = 0; //number

console.log(fals == str); //true
console.log(fals == zero); //true
console.log(str == zero); //true

console.log(fals === str); //false
console.log(fals === zero); //false
console.log(str === zero); //false
