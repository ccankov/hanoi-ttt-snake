/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Board = __webpack_require__(1);

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.setupBoard();
    this.bindEvents();
    this.refreshInterval = setInterval(this.step.bind(this), 100);
  }

  bindEvents() {
    $(document).on('keydown',this.handleKeyEvent.bind(this));
  }

  handleKeyEvent(event) {
    const keyVal = event.keyCode;

    if (keyVal === 13 || keyVal === 32) {
      event.preventDefault();
    } else if ([37, 38, 39, 40].includes(keyVal)) {
      this.board.snak.turn(keyVal - 37);
    }
  }

  step() {
    if(this.board.snak.move()) {
      this.render();
    } else {
      alert('You lose!');
      clearInterval(this.refreshInterval);
    }
  }

  setupBoard() {
    for (let i = 0; i < Board.DIM_Y; i++) {
      const $ul = $('<ul></ul>');

      for (let j = 0; j < Board.DIM_X; j++) {
        const $li = $('<li></li>');
        $li.data('pos',[i, j]);
        $li.addClass('blank');

        $ul.append($li);
      }

      this.$el.append($ul);
    }
  }

  render() {
    $('li').removeClass();
    $('li').addClass('blank');
    this.board.snak.segments.forEach((segment) => {
      this.setPosClass(segment, 'snak');
    });
    this.setPosClass(this.board.applePos, 'apple');
  }

  setPosClass(pos, className) {
    let [row, col] = pos;
    let $ul = $('ul')[row];
    let li = $ul.children[col];
    let $li = $(li);
    $li.removeClass();
    $li.addClass(className);
  }


}

module.exports = View;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const Snake = __webpack_require__(3);

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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const View = __webpack_require__(0);

$(()=> {
  const $figure = $('.mySnak');
  const view = new View($figure);
});


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);