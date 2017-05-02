class Snake {
  constructor(){
    this.direction = 1;
    this.segments = [[19,9],[18,9]];

  }

  move() {
    let head = this.segments[this.segments.length-1];
    let diff = Snake.directionDiffs[this.direction];
    let newHead = [head[0] + diff[0],head[1] + diff[1]];

    // if newHead out of bounds, lose

    this.segments.push(newHead);
    this.segments.shift();
  }

  turn(dirIdx) {
    this.direction = dirIdx;
  }



}

Snake.directionDiffs = [[0,-1], [-1,0],[0,1],[1,0]];
Snake.directions = ["W" ,"N", "E", "S"];

module.exports = Snake;
