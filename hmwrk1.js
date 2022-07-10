function newmap(arr, func) {
    arr.forEach(elem => { return func(elem); });
    return arr;
}

function increment(t) { ++t; } 

console.log(newmap([1, 4, 27], increment));
