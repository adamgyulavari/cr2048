
const assert = require('assert');

const cellsToSeed = require('./cellsToSeed.js');
const rand = require('./rand.js');
const range = require('./range.js');
const stringToSeed = require('./stringToSeed.js');

const copyCells = (cells) => (
  cells.map(row => row.map(cell => cell))
);

const resetCells = () => (range(4).map(() => [0, 0, 0, 0]));

const repeatStr = (str, n) => {
  let result = '';

  for (let i = 0; i < n; i++) {
    result += str;
  }

  return result;
};

const padNum = (n, len) => {
  const nStr = String(n);

  return repeatStr(' ', len - nStr.length) + nStr;
};

const Board = (argInput) => {
  // This is a workaround for browserify's parser and nodejs not supporting this type of argument
  // destructuring: ({ x = 1, y = 2 } = {}) => x + y;
  const arg = argInput || {};
  const gameSeed = arg.gameSeed || '';
  const inputCells = arg.cells || resetCells();
  let transform = resetCells();

  const board = {};

  const cells = copyCells(inputCells);

  board.getCells = () => copyCells(cells);
  board.getTransformation = () => copyCells(transform);
  board.emptyTransformation = () => {
    transform = resetCells();
  };

  const countEmptyCells = () => {
    let count = 0;

    for (let x = 0; x !== 4; x++) {
      for (let y = 0; y !== 4; y++) {
        if (cells[x][y] === 0) {
          count++;
        }
      }
    }

    return count;
  };

  const insertRandomBlock = () => {
    const emptyCount = countEmptyCells();

    if (emptyCount === 0) {
      return false;
    }

    // Extract both random decisions from the same rand value.
    let randVal = rand(stringToSeed(gameSeed) + cellsToSeed(cells));
    randVal *= 10;

    const blockVal = (randVal < 1 ? 4 : 2);
    randVal = randVal - Math.floor(randVal);

    const blockIndex = Math.floor(emptyCount * randVal);

    let emptySoFar = 0;

    for (let x = 0; x !== 4; x++) {
      for (let y = 0; y !== 4; y++) {
        if (cells[x][y] === 0) {
          if (emptySoFar === blockIndex) {
            cells[x][y] = blockVal;
            return true;
          }

          emptySoFar++;
        }
      }
    }

    assert(false);
    return undefined;
  };

  // If the board is empty, insert two random blocks
  if (countEmptyCells() === 16) {
    range(2).forEach(insertRandomBlock);
  }

  const collapseUp = (get, set, setTransform) => {
    let changed = false;

    for (let x = 0; x !== 4; x++) {
      const row = range(4).map(y => get(x, y));
      const filteredRow = row.filter(v => v !== 0);
      const newRow = [];
      let transformRow = [0,0,0,0];
      let v=0, t=0;
      for (let i = 0; i < 4; i++) {
        if (row[i] === 0) {
          t++;
        } else {
          if (v === row[i]) {
            t++;
            v = row[i]*2;
          } else {
            v = row[i];
          }
          transformRow[i] = t;
          t = (t>0 ? t : 0);
        }
      }
      transformRow.forEach((t, y) => setTransform(x, y, t));
      (() => {
        let y = 0;

        while (y < filteredRow.length) {
          if (filteredRow[y] === filteredRow[y + 1]) {
            newRow.push(2 * filteredRow[y]);
            y += 2;
          } else {
            newRow.push(filteredRow[y]);
            y += 1;
          }
        }
      })();

      const paddedNewRow = range(4).map(y => newRow[y] || 0);

      range(4).forEach(y => {
        if (row[y] !== paddedNewRow[y]) {
          changed = true;
        }
      });

      range(4).forEach(y => set(x, y, paddedNewRow[y]));
    }

    return changed;
  };

  board.left = () => (
    collapseUp(
      (x, y) => cells[y][x],
      (x, y, v) => { cells[y][x] = v; },
      (x, y, t) => { transform[y][x] -= t; }
    ) &&
    insertRandomBlock()
  );

  board.right = () => (
    collapseUp(
      (x, y) => cells[3 - y][x],
      (x, y, v) => { cells[3 - y][x] = v; },
      (x, y, t) => { transform[3 - y][x] += t; }
    ) &&
    insertRandomBlock()
  );

  board.up = () => (
    collapseUp(
      (x, y) => cells[x][y],
      (x, y, v) => { cells[x][y] = v; },
      (x, y, t) => { transform[x][y] -= t; }
    ) &&
    insertRandomBlock()
  );

  board.down = () => (
    collapseUp(
      (x, y) => cells[x][3 - y],
      (x, y, v) => { cells[x][3 - y] = v; },
      (x, y, t) => { transform[x][3 - y] += t; }
    ) &&
    insertRandomBlock()
  );

  board.clone = () => Board({ gameSeed, cells });

  board.prettyString = () => {
    const maxLen = (Array.prototype.concat.apply([], cells)
      .map(n => String(n).length)
      .reduce((a, b) => Math.max(a, b))
    );

    const horizBorder = `+${repeatStr('-', 4 * (maxLen + 2))}+\n`;

    let result = horizBorder;

    // This is why arrays are meant to be indexed by i and j, not x and y.
    for (let y = 0; y !== 4; y++) {
      result += '|';

      for (let x = 0; x !== 4; x++) {
        result += ` ${padNum(cells[x][y], maxLen)} `;
      }

      result += '|\n';
    }

    result += horizBorder;

    return result;
  };

  return board;
};

module.exports = Board;
