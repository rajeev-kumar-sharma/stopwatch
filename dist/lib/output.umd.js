(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Output;
    (function (Output) {
        Output[Output["String"] = 0] = "String";
        Output[Output["Array"] = 1] = "Array";
    })(Output = exports.Output || (exports.Output = {}));
});
