import * as fs from 'fs';

const data = fs.readFileSync('input.txt', 'utf8');

const lines = data.trim().split('\n');

const left: number[] = [];
const right: number[] = [];

lines.forEach(line => {
    const [l,r] = line.split(/\s+/).map(Number);
    left.push(l);
    right.push(r);
});

left.sort((a, b) => a - b);
right.sort((a, b) => a - b);

let sum: number = 0;

for (let i = 0; i < left.length; i++){
    sum += Math.abs(left[i] - right[i]);
}

fs.writeFileSync("output.txt",`answer for part one: ${sum}\n`);

// part two

const freq = new Map<number,number>();

right.forEach(item => {
    if (freq.has(item)){
        freq.set(item,(freq.get(item) || 0) + 1);
    }
    else {
        freq.set(item,1);
    }
})


let similarity_score: number = 0;

left.forEach(item => {
    similarity_score += item * (freq.get(item) || 0);
})

fs.appendFileSync("output.txt",`answer for part two: ${similarity_score}`)






