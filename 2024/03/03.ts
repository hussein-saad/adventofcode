import * as fs from 'fs';

function extractAndMultiply(data: string): number {
  const regex = /mul\((\d+),(\d+)\)/g;
  let sum = 0;
  let match;

  while ((match = regex.exec(data)) !== null) {
    const num1 = parseInt(match[1], 10);
    const num2 = parseInt(match[2], 10);
    sum += num1 * num2;
  }

  return sum;
}

function extractAndMultiply2(data: string): number {
  const regex = /mul\((\d+),(\d+)\)|do\(\)|don't\(\)/g;
  let sum = 0;
  let match;

  let is_do = true;

  while ((match = regex.exec(data)) !== null) {
    if (match[0] === "do()") {
      is_do = true;
    }
    else if (match[0] === "don't()") {
      is_do = false;
    }

    else {
        const num1 = parseInt(match[1], 10);
        const num2 = parseInt(match[2], 10);
    
        if (is_do) {
            sum += num1 * num2;
        }
    }

  }

  return sum;
}

let data = fs.readFileSync('input.txt', 'utf-8');

fs.writeFileSync('output.txt',`answer for part one: ${extractAndMultiply(data)}\n`);
fs.appendFileSync('output.txt',`answer for part two: ${extractAndMultiply2(data)}\n`);
