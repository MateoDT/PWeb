const myModule = require('./modulSum.js');
const parFunc = (vec, parNum) =>  myModule.Sum(vec.filter(el => el % 2 === parNum % 2));

module.exports = {
	parFunc
};
