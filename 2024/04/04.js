"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function is_valid(matrix, row, col) {
    return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}
function count(matrix) {
    var count = 0;
    var directions = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 1, dc: 1 },
        { dr: -1, dc: 1 },
        { dr: 0, dc: -1 },
        { dr: -1, dc: 0 },
        { dr: -1, dc: -1 },
        { dr: 1, dc: -1 },
    ];
    var target = 'XMAS';
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            for (var _i = 0, directions_1 = directions; _i < directions_1.length; _i++) {
                var _a = directions_1[_i], dr = _a.dr, dc = _a.dc;
                var found = true;
                for (var k = 0; k < target.length; k++) {
                    var newRow = i + k * dr;
                    var newCol = j + k * dc;
                    if (!is_valid(matrix, newRow, newCol) ||
                        matrix[newRow][newCol] !== target[k]) {
                        found = false;
                        break;
                    }
                }
                if (found)
                    count++;
            }
        }
    }
    return count;
}
function count2(matrix) {
    var count = 0;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 'A') {
                if (is_valid(matrix, i - 1, j + 1) &&
                    is_valid(matrix, i + 1, j + 1) &&
                    is_valid(matrix, i + 1, j - 1) &&
                    is_valid(matrix, i - 1, j - 1) &&
                    ((matrix[i - 1][j - 1] == 'S' && matrix[i + 1][j + 1] == 'M') ||
                        (matrix[i - 1][j - 1] == 'M' && matrix[i + 1][j + 1] == 'S')) &&
                    ((matrix[i - 1][j + 1] == 'S' && matrix[i + 1][j - 1] == 'M') ||
                        (matrix[i - 1][j + 1] == 'M' && matrix[i + 1][j - 1] == 'S'))) {
                    count++;
                }
            }
        }
    }
    return count;
}
var data = fs.readFileSync('input.txt', 'utf8');
var matrix = data.split('\n').map(function (line) { return line.split(''); });
fs.writeFileSync('output.txt', "answer for part one: ".concat(count(matrix), "\n"));
fs.appendFileSync('output.txt', "answer for part two: ".concat(count2(matrix), "\n"));
