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
/*function newpartition(arr, func) {
    const arrtrue = [], arrfalse = [];
    arr.forEach(elem => {
        (func(elem)) ? arrtrue.push(elem) : arrfalse.push(elem);
    });
    return [arrtrue, arrfalse];
}*/
    //(2)
/*function newpartition(arr, func) {
    return arr.reduce(function (resarr, current) {
        (func(current)) ? resarr[0].push(current) : resarr[1].push(current);
        return resarr;
      }, [[],[]]);
    }*/

/*function is_odd(num) { return num % 2; }
console.table(newpartition([1, 2, 3, 4, 5, 6, 7], is_odd));
function is_longer4(word) { return word.length >= 4; }
console.table(newpartition(["Somebody", "once", "told", "me", "the", "world", "is", "gonna"], is_longer4));*/


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
for (let i = 1; i < arr.length; i++) {
    if (arrsort[i-1] === arrsort[i]) { i++; continue; }
    else { console.log("2) ", arrsort[i-1]); is_output = true; break; }
}
if (!is_output) console.log("2) ", arrsort.pop())

    //(2*)
res = 0;
arr.forEach(elem => res ^= elem);
console.log("2*)", res);*/


//4
class MyIterator{
    constructor(syms, num) {
        this.alpht = syms.split("").sort();
        this.curperm = "";
        for (let i = 0; i < num; i++) this.curperm += this.alpht[i];
        this.lastperm = "";
        for (let i = this.alpht.length - 1; i >= this.alpht.length - num; i--) this.lastperm += this.alpht[i];
        this.len = num;
    }

    hasNext() {
        return this.curperm !== this.lastperm;
    }
    next() {
        if (!this.hasNext()) return;

        let curarr = this.curperm.split("");
        let isfound = false;
        for (let i = this.len - 1; i >= 0 && !isfound; i--) {
            for (let j = this.alpht.indexOf(curarr[i]) + 1; j < this.alpht.length; j++) {
                curarr.splice(i+1);
                if (!curarr.includes(this.alpht[j])) {
                    //minsuit = curarr[i];
                    curarr[i] = this.alpht[j];
                    isfound = true;
                    break;
                }
            }
        }

        for (let i = 0; i < this.alpht.length && curarr.length < this.len; i++) 
            if (!curarr.includes(this.alpht[i])) curarr.push(this.alpht[i]);

        this.curperm = curarr.join("");
        return this.curperm;
    }
}

const test = new MyIterator("bads", 1);
console.log(test.curperm);
while (test.hasNext())
    console.log(test.next());
