for(var array=[], i = 0; i <= 100; i++) array[i] = i;

var evenArray = array.filter(el => el % 2 == 0);

console.log(evenArray);

function showElem(array, idx, showFunc) {
	showFunc(array, idx);
}

function getElem(array, idx) {
	console.log(array[idx]);
}

getElem(evenArray, 2, getElem);