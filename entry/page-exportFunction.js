import subpageA from "./../js/subPageA";
import subpageB from  "./../js/subPageB";
console.log(subpageA.sum(3,4));
console.log(subpageB.minus(3,4));

/*import("./../js/subPageA").then(function(subpageA) {
  console.log(subpageA.sum(3,4));
});

import( "./../js/subPageB").then(function(subpageB) {
  console.log(subpageB.minus(3,4));
});

import( "lodash").then(function(_) {
  console.log(_.join(["1", "2"]));
});*/
export default "page";
