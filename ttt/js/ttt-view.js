class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    let $squares = $('li');
    $squares.on('click', event => {
      let $sq = $(event.currentTarget);
      this.makeMove($sq);
    });
  }

  makeMove($sq) {
    let strPos = $sq.data('pos');
    let arrPos = strPos.split(',').map((el) => parseInt(el));
    let mark = this.game.currentPlayer;
    try {
      this.game.playMove(arrPos);
      $sq.text(mark);
      $sq.addClass(mark);
    }
    catch(err) {
      alert(err.msg);
    }

    // check for winner
    if (this.game.isOver()) {

      const winner = this.game.board.winner();
      if (winner) {
        alert(`Winner is ${winner}`);
      } else {
        alert('The cats always win');
      }
    }
  }

  setupBoard() {
    for (let i = 0; i < 3; i++) {
      const $row = $('<ul></ul>');
      for (let j = 0; j < 3; j++) {
        const $sq = $('<li></li>');
        let pos = [i, j].toString();
        $sq.data('pos', pos);

        $row.append($sq);
      }

    this.$el.append($row);
    }
  }
}

module.exports = View;
