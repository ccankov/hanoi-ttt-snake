const Board = require('./board');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board();
    this.setupBoard();
    this.bindEvents();
    setInterval(this.step.bind(this), 100);
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
    this.board.snak.move();
    this.render();
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
