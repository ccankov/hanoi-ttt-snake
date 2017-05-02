class Snake {
  constructor(board){
    this.direction = 1;
    this.segments = [[19,9],[18,9]];
    this.board = board;
  }

  move() {
    let head = this.segments[this.segments.length-1];
    let diff = Snake.directionDiffs[this.direction];
    let newHead = [head[0] + diff[0],head[1] + diff[1]];

    if (!this.board.validPos(newHead) || this.intersectsSelf(newHead)) {
      return false;
    }

    this.segments.push(newHead);

    let gotApple = (newHead[0] === this.board.applePos[0] &&
      newHead[1] === this.board.applePos[1]);

    if (gotApple) {
      this.board.newApple();
    } else {
      this.segments.shift();
    }

    return true;
  }

  intersectsSelf(pos) {
    for(let i = 0; i < this.segments.length; i ++){
      let [row, col] = this.segments[i];
      if (row === pos[0] && col === pos[1]) {
        return true;
      }
    }

    return false;
  }

  turn(dirIdx) {
    this.direction = dirIdx;
  }

}

Snake.directionDiffs = [[0,-1], [-1,0],[0,1],[1,0]];
Snake.directions = ["W" ,"N", "E", "S"];

module.exports = Snake;
