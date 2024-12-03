"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function extractAndMultiply(data) {
    var regex = /mul\((\d+),(\d+)\)/g;
    var sum = 0;
    var match;
    while ((match = regex.exec(data)) !== null) {
        var num1 = parseInt(match[1], 10);
        var num2 = parseInt(match[2], 10);
        sum += num1 * num2;
    }
    return sum;
}
function extractAndMultiply2(data) {
    var regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
    var sum = 0;
    var match;
    var is_do = true;
    while ((match = regex.exec(data)) !== null) {
        if (match[0] === "do()") {
            is_do = true;
        }
        else if (match[0] === "don't()") {
            is_do = false;
        }
        else {
            var num1 = parseInt(match[1], 10);
            var num2 = parseInt(match[2], 10);
            if (is_do) {
                sum += num1 * num2;
            }
        }
    }
    return sum;
}
var data = fs.readFileSync('input.txt', 'utf-8');
fs.writeFileSync('output.txt', "answer for part one: ".concat(extractAndMultiply(data), "\n"));
fs.appendFileSync('output.txt', "answer for part two: ".concat(extractAndMultiply2(data), "\n"));
