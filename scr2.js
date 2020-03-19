const constanta = 'abc';
let variabila = 3;

function adauga (x, y, z) {
  if (x === 'abc') {
    y = y + z;
  }
  return  y;
}

const rezultat = adauga(constanta, variabila, 10);

console.log(rezultat);