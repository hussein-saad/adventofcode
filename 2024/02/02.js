"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function isSafe(level) {
    var is_increasing = true;
    var is_decreasing = true;
    for (var i = 0; i < level.length - 1; i++) {
        var diff = level[i + 1] - level[i];
        if (!(diff >= 1 && diff <= 3)) {
            is_increasing = false;
        }
        if (!(diff >= -3 && diff <= -1)) {
            is_decreasing = false;
        }
    }
    return is_increasing || is_decreasing;
}
function remove(level, idx) {
    return level.filter(function (_, i) { return i !== idx; });
}
function isSafe2(level) {
    var safe = false;
    for (var i = 0; i < level.length; i++) {
        safe || (safe = isSafe(remove(level, i)));
    }
    return safe;
}
var data = fs.readFileSync('input.txt', 'utf8');
var levels = data.split('\n');
var num_of_safe = 0;
levels.forEach(function (level) {
    var arr = level.split(' ').map(Number);
    num_of_safe += isSafe(arr) ? 1 : 0;
});
fs.writeFileSync('output.txt', "answer for part one: ".concat(num_of_safe, "\n"));
var num_of_safe2 = 0;
levels.forEach(function (level) {
    var arr = level.split(' ').map(Number);
    num_of_safe2 += isSafe2(arr) ? 1 : 0;
});
fs.appendFileSync('output.txt', "answer for part two: ".concat(num_of_safe2, "\n"));
