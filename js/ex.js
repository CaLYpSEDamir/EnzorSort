;(function() {
    'use strict';
    var i = 0;
    var externalVariable = {
        name: "external"
    };

    function outerFn() {
        externalVariable.supername = "super puper";
        var obj = { };

        function innerFn(ob) {
            i++;
            ob[i] = {
                level: i
            };

            if (i > 10) {
                return;
            } else {
                innerFn(ob[i]);
            }
        }

        innerFn(obj);
        return externalVariable;
    }

    var result = outerFn();

    console.log(externalVariable);
    console.log(result);


})();

