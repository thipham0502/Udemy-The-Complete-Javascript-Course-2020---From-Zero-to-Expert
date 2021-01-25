'use strict';

function parent() {
    console.log(x); //x = 0 (global variable)
    console.log(y); //inaccessible
    console.log(z); //inaccessible

    function child() {
        const x = 1; //over-write
        let y = 2;
        var z = 3;
        console.log(x); //x = 1 (function-scoped)
    }
}
const x = 0;
parent();
