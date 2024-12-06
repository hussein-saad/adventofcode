import * as fs from 'fs';

function is_valid(matrix: string[][], row: number, col: number): boolean {
  return row >= 0 && row < matrix.length && col >= 0 && col < matrix[0].length;
}

function count(matrix: string[][]): number {
  let count = 0;
  const directions = [
    { dr: 0, dc: 1 },
    { dr: 1, dc: 0 },
    { dr: 1, dc: 1 },
    { dr: -1, dc: 1 },
    { dr: 0, dc: -1 },
    { dr: -1, dc: 0 },
    { dr: -1, dc: -1 },
    { dr: 1, dc: -1 },
  ];

  const target = 'XMAS';

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      for (const { dr, dc } of directions) {
        let found = true;
        for (let k = 0; k < target.length; k++) {
          const newRow = i + k * dr;
          const newCol = j + k * dc;
          if (
            !is_valid(matrix, newRow, newCol) ||
            matrix[newRow][newCol] !== target[k]
          ) {
            found = false;
            break;
          }
        }
        if (found) count++;
      }
    }
  }

  return count;
}

function count2(matrix: string[][]): number {
  let count = 0;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 'A') {
        if (
          is_valid(matrix, i - 1, j + 1) &&
          is_valid(matrix, i + 1, j + 1) &&
          is_valid(matrix, i + 1, j - 1) &&
          is_valid(matrix, i - 1, j - 1) &&
          ((matrix[i - 1][j - 1] == 'S' && matrix[i + 1][j + 1] == 'M') ||
            (matrix[i - 1][j - 1] == 'M' && matrix[i + 1][j + 1] == 'S')) &&
          ((matrix[i - 1][j + 1] == 'S' && matrix[i + 1][j - 1] == 'M') ||
            (matrix[i - 1][j + 1] == 'M' && matrix[i + 1][j - 1] == 'S'))
        ) {
          count++;
        }
      }
    }
  }

  return count;
}

const data = fs.readFileSync('input.txt', 'utf8');
const matrix = data.split('\n').map((line) => line.split(''));

fs.writeFileSync('output.txt', `answer for part one: ${count(matrix)}\n`);
fs.appendFileSync('output.txt', `answer for part two: ${count2(matrix)}\n`);

