const arr = [1, 2, 3, 4];
console.log(arr.map(x => x*2)); //2 4 6 8

const obj = { a:2, b:3, c: (x, y) => console.log(x + y)}
console.log(obj.c(obj.a, obj['b'])); //5

const func1 = (x, cb) => cb(x);
const func2 = y => console.log(y);

func1(3, func2); //3