function formatInput(rawInput) {
  const input = rawInput.split("\n\n").filter(Boolean);
  const numbers = input[0].split(",").map((n) => +n);
  const boards = input.slice(1).map((grid) =>
    grid
      .split("\n")
      .filter(Boolean)
      .map((v) =>
        v
          .split(" ")
          .filter(Boolean)
          .map((n) => ({ value: +n, marked: false }))
      )
  );

  return { numbers, boards };
}
function solution1({ numbers, boards }) {
  const sum = (board) => {
    let s = 0;
    for (const c of board) for (const x of c) s += !x.marked ? x.value : 0;
    return s;
  };

  for (const n of numbers) {
    for (const board of boards) {
      for (const row of board) {
        for (const col of row) {
          if (col.value === n) {
            col.marked = true;
          }
        }
      }
      let won = false;
      for (let i = 0; i < board.length; i++) {
        let found = true;
        for (let j = 0; j < board[i].length; j++) {
          if (!board[i][j].marked) {
            found = false;
            break;
          }
        }
        if (found) {
          won = true;
          break;
        }
      }
      for (let i = 0; i < board.length; i++) {
        let found = true;
        for (let j = 0; j < board[i].length; j++) {
          if (!board[j][i].marked) {
            found = false;
            break;
          }
        }
        if (found) {
          won = true;
          break;
        }
      }
      if (won) return sum(board) * n;
    }
  }
}
function solution2({ numbers, boards }) {
  const sum = (board) => {
    let s = 0;
    for (const c of board) for (const x of c) s += !x.marked ? x.value : 0;
    return s;
  };

  const winning = [];
  for (const n of numbers) {
    for (const [k, board] of boards.entries()) {
      if (winning.includes(k)) continue;
      for (const row of board) {
        for (const col of row) {
          if (col.value === n && !col.marked) {
            col.marked = true;
          }
        }
      }
      let won = false;
      for (let i = 0; i < board.length; i++) {
        let found = true;
        for (let j = 0; j < board[i].length; j++) {
          if (!board[i][j].marked) {
            found = false;
            break;
          }
        }
        if (found) won = true;
      }
      for (let i = 0; i < board.length; i++) {
        let found = true;
        for (let j = 0; j < board[i].length; j++) {
          if (!board[j][i].marked) {
            found = false;
            break;
          }
        }
        if (found) won = true;
      }
      if (won) {
        if (boards.length - winning.length > 1) winning.push(k);
        else return sum(board) * n;
      }
    }
  }
}

console.log(solution1(formatInput(input)));
console.log(solution2(formatInput(input)));
