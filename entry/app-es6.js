import sum from "../js/sum.js";

//commonJs
var minus=require('../js/minus');


console.log(sum(23,24));
console.log(minus(23,24));
let a=[1,2,3,4,5];
let b=a.includes(5);
console.log(b);
let newArr=a.map(item=>{
	return item*2;
});
console.log(new Set(newArr));

