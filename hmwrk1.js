//1
/*function newmap(arr, func) {
    arr.forEach((elem, index) => arr[index] = func(arr[index]));
    return arr;
}
function randfunc1(t) { return ++t; } 
function randfunc2(t) { return Math.sqrt(t); } 
function randfunc3(t) { return t + " parrots"; } 


const array = [1, 3, 24]
console.log(newmap(array, randfunc1));
console.log(newmap(array, randfunc2));
console.log(newmap(array, randfunc3));*/


//2
    //(1)
function newpartition(arr, func) {
    const arrtrue = [], arrfalse = [];
    arr.forEach(elem => {
        (func(elem)) ? arrtrue.push(elem) : arrfalse.push(elem);
    });
    return [arrtrue, arrfalse];
}
function is_odd(num) { return num % 2; }
console.table(newpartition([1, 2, 3, 4, 5, 6, 7], is_odd));
function is_longer4(word) { return (word.length >= 4); }
console.table(newpartition(["Somebody", "once", "told", "me", "the", "world", "is", "gonna"], is_longer4));

//3
/*const arr = [1, 2, 4, 3, 3, 5, 2, 1, 4];

    //(1)
const newarr = [];
function is_in_newarr(elem) {
    let elemi = newarr.indexOf(elem);
    (elemi === -1) ? newarr.push(elem) : newarr.splice(elemi, 1);
}
arr.forEach(elem => is_in_newarr(elem));
console.log("1) ", newarr[0]);

    //(2)
const arrsort = arr.slice().sort();
is_output = false;
for (i = 1; i < arr.length; i++) {
    if (arrsort[i-1] === arrsort[i]) { i++; continue; }
    else { console.log("2) ", arrsort[i-1]); is_output = true; break; }
}
if (!is_output) console.log("2) ", arrsort.pop())

    //(2*)
res = 0;
arr.forEach(elem => res ^= elem);
console.log("2*)", res);*/
