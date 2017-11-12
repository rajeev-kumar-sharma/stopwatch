(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./lib/stopwatch", "./lib/output"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var stopwatch_1 = require("./lib/stopwatch");
    exports.Stopwatch = stopwatch_1.Stopwatch;
    var output_1 = require("./lib/output");
    exports.Output = output_1.Output;
});
