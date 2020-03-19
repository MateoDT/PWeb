const obj1 = {a:2};
const obj2 = obj1; // copiere prin referinta

obj2.a = 5;
console.log(obj1); // {a:5} -> valoarea s-a modificat si in obiectul original

const obj3 = Object.assign({}, obj1); // copiere prin valoare

obj3.a = 10;
console.log(obj1); // {a:5} -> valoarea nu s-a modificat

const obj4 = {...obj1} // copiere prin valoare (modern, folosind spread operator, ES6)

obj4.a = 9772;
console.log(obj1); // {a:5} -> valoarea nu s-a modificat