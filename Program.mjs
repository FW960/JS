"use strict";
import _ from "lodash";

function crObj(num)
{
    let num1 = _.toString(num);

    if (num1.length >= 4)
        return null;

        let toReturnObj  = {units: parseInt(num1[0]), dozens: parseInt(num1[1]), hundreds: parseInt(num1[2])};
        
        return toReturnObj;

}

let obj = crObj(123);

console.log(obj);


