class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.render();
    this.bindEvents();
  }

  setupTowers() {
    for (let i = 0; i < 3; i++) {
      let $tow = $('<ul></ul>');
      $tow.data('index', i);

      for (let j = 0; j < 3; j++) {
        let $disc = $('<li></li>');
        $disc.addClass(`size-${0}`);

        $tow.append($disc);
      }

      this.$el.append($tow);
    }
  }

  render() {
    let towers = this.game.towers;
    let $towers = $('ul');
    for (let i = 0; i < towers.length; i++) {
      let tower = towers[i];
      let discs = $towers[i].children;
      for (let j = 0; j < 3; j++) {
        let $disc = $(discs[j]);
        if (tower[j] === undefined) {
          $disc.removeClass();
          $disc.addClass(`size-0`);
        } else {
          $disc.removeClass(`size-0`);
          $disc.addClass(`size-${tower[j]}`);
        }
      }
    }
  }

  bindEvents() {
    $('ul').on('click', this.clickTower.bind(this));
  }

  clickTower(event){
    let pile = event.currentTarget;
    let $pile = $(pile);
    if (this.selectedIdx !== undefined) {
      let towerIdx = parseInt($pile.data('index'));
      if (this.game.move(this.selectedIdx, towerIdx)) {
        this.render();

        if (this.game.isWon()) {
          alert("You're pretty darn awesome!");
        }
      } else {
        alert('Invalid move!');
      }
      $('.selected').removeClass();
      this.selectedIdx = undefined;
    } else {
      this.selectedIdx = parseInt($pile.data('index'));
      $pile.addClass('selected');
    }
  }
}

module.exports = View;
