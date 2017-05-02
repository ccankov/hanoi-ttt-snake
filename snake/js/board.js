const Snake = require('./snake');

class Board {
  constructor() {
    this.snak = new Snake(this);
    this.newApple();
  }

  validPos(pos) {
    let [row, col] = pos;
    if (row < 0 || col < 0 || row >= Board.DIM_X || col >= Board.DIM_Y) {
      return false;
    }
    return true;
  }

  randomPos() {
    let row = Math.floor(Board.DIM_X * Math.random());
    let col = Math.floor(Board.DIM_Y * Math.random());
    return [row, col];
  }

  newApple() {
    this.applePos = this.randomPos();
  }
}

Board.DIM_X = 40;
Board.DIM_Y = 40;

module.exports = Board;
