"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var data = fs.readFileSync('input.txt', 'utf8');
var lines = data.trim().split('\n');
var left = [];
var right = [];
lines.forEach(function (line) {
    var _a = line.split(/\s+/).map(Number), l = _a[0], r = _a[1];
    left.push(l);
    right.push(r);
});
left.sort(function (a, b) { return a - b; });
right.sort(function (a, b) { return a - b; });
var sum = 0;
for (var i = 0; i < left.length; i++) {
    sum += Math.abs(left[i] - right[i]);
}
fs.writeFileSync("output.txt", "answer for part one: ".concat(sum, "\n"));
// part two
var freq = new Map();
right.forEach(function (item) {
    if (freq.has(item)) {
        freq.set(item, (freq.get(item) || 0) + 1);
    }
    else {
        freq.set(item, 1);
    }
});
var similarity_score = 0;
left.forEach(function (item) {
    similarity_score += item * (freq.get(item) || 0);
});
fs.appendFileSync("output.txt", "answer for part two: ".concat(similarity_score));
