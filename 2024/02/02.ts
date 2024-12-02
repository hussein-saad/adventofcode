import * as fs from 'fs';

function isSafe(level: number[]): boolean {
  let is_increasing: boolean = true;
  let is_decreasing: boolean = true;

  for (let i = 0; i < level.length - 1; i++) {
    let diff: number = level[i + 1] - level[i];

    if (!(diff >= 1 && diff <= 3)) {
      is_increasing = false;
    }

    if (!(diff >= -3 && diff <= -1)) {
      is_decreasing = false;
    }
  }

  return is_increasing || is_decreasing;
}

function remove(level: number[], idx: number): number[] {
    return level.filter((_, i) => i !== idx);
}

function isSafe2(level: number[]): boolean {
  let safe: boolean = false;

  for (let i = 0; i < level.length; i++) {
    safe ||= isSafe(remove(level, i));
  }
  return safe;
}

let data = fs.readFileSync('input.txt', 'utf8');

let levels = data.split('\n');

let num_of_safe = 0;

levels.forEach((level) => {
  let arr: number[] = level.split(' ').map(Number);
  num_of_safe += isSafe(arr) ? 1 : 0;
});

fs.writeFileSync('output.txt', `answer for part one: ${num_of_safe}\n`);


let num_of_safe2 = 0;

levels.forEach((level) => {
  let arr: number[] = level.split(' ').map(Number);
  num_of_safe2 += isSafe2(arr) ? 1 : 0;
});

fs.appendFileSync('output.txt', `answer for part two: ${num_of_safe2}\n`);
