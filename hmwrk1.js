//1
function newmap(arr, func) {
    arr.forEach((elem, index) => arr[index] = func(arr[index]));
    return arr;
}
function randfunc1(t) { return ++t; } 
function randfunc2(t) { return Math.sqrt(t); } 
function randfunc3(t) { return t + " parrots"; } 
function randfunc4(t) { return "E"; } 


const array = [1, 3, 24]
console.log(newmap(array, randfunc1));
console.log(newmap(array, randfunc2));
console.log(newmap(array, randfunc3));
console.log(newmap(array, randfunc4));
