// deno-lint-ignore-file camelcase
import { parse } from "https://deno.land/std/flags/mod.ts";

const split_line_break = (str: string) => {
  return str.split(/\r?\n/);
};

type Matrix<T = number> = T[][];

const get_neighbors = (
  max_bound: number,
  node: number[],
) => ([
  [node[0] + -1, node[1] + -1], // top-left
  [node[0] + -1, node[1] + 0], // top-center
  [node[0] + -1, node[1] + 1], // top-right
  [node[0] + 0, node[1] + 1], // right
  [node[0] + 1, node[1] + 1], // bottom-right
  [node[0] + 1, node[1] + 0], // bottom-center,
  [node[0] + 1, node[1] + -1], // bottom-left,
  [node[0] + 0, node[1] + -1], // left
].filter(([r, c]) => (r <= max_bound && c <= max_bound) && (0 <= r && 0 <= c)));

const part1 = (matrix: Matrix, matrix_length: number) => {
  let PART_1_TOTAL = 0;

  // steps loop
  for (let i = 0; i < 100; i++) {
    // increment all cells by 1
    const nextMatrix = matrix.map((row) => row.map((level) => level + 1));

    // continue to traverse all cells if there is a cell that glows (>9)
    while (nextMatrix.flat().find((x) => x > 9)) {
      for (let r = 0; r <= matrix_length; r++) {
        for (let c = 0; c <= matrix_length; c++) {
          // if the cell > 9 increment all the neighbors by 1
          // that have not exceeded 9
          if (nextMatrix[r][c] > 9) {
            for (const n of get_neighbors(matrix_length, [r, c])) {
              if (nextMatrix[n[0]][n[1]] === 0) {
                continue;
              }
              nextMatrix[n[0]][n[1]] += 1;
            }
            nextMatrix[r][c] = 0;
          }
        }
      }
    }

    PART_1_TOTAL += nextMatrix.flat().filter((x) => x === 0).length;
    matrix = nextMatrix;
  }

  return PART_1_TOTAL;
};

const part2 = (matrix: Matrix, matrix_length: number) => {
  let PART_2_TOTAL = 1;

  // steps loop
  for (; PART_2_TOTAL < 10000; ++PART_2_TOTAL) {
    // increment all cells by 1
    const nextMatrix = matrix.map((row) => row.map((level) => level + 1));

    // continue to traverse all cells if there is a cell that glows (>9)
    while (nextMatrix.flat().find((x) => x > 9)) {
      for (let r = 0; r <= matrix_length; r++) {
        for (let c = 0; c <= matrix_length; c++) {
          // if the cell > 9 increment all the neighbors by 1
          // that have not exceeded 9
          if (nextMatrix[r][c] > 9) {
            for (const n of get_neighbors(matrix_length, [r, c])) {
              if (nextMatrix[n[0]][n[1]] === 0) {
                continue;
              }
              nextMatrix[n[0]][n[1]] += 1;
            }
            nextMatrix[r][c] = 0;
          }
        }
      }
    }

    if (
      nextMatrix.flat().filter((x) => x === 0).length ===
        nextMatrix.flat().length
    ) {
      break;
    }

    matrix = nextMatrix;
  }

  return PART_2_TOTAL;
};

const FILE_NAME = parse(Deno.args)["sample"] ? "sample.txt" : "input.txt";

Deno.readTextFile(FILE_NAME)
  .then((data) => {
    const matrix = split_line_break(data).map((line) =>
      line.split("").map((x) => +x)
    );
    const N = matrix.length - 1;

    console.log("---------------");
    console.log(`part1 answer: ${part1(matrix, N)}\n`);
    console.log(`part2 answer: ${part2(matrix, N)}\n`);
    console.log("---------------");
  })
  .catch((err) => {
    console.error(err);
    Deno.exit(1);
  });
