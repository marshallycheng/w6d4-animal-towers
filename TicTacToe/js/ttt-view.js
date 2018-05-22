class View {
  constructor(game, $el) {
    this.el = $el;
    this.game = game;
    $el.append(this.setupBoard());
    this.bindEvents();
  }

  bindEvents() {
    this.el.on('click','li', (e) => {
      let $square = $(e.currentTarget);
      this.makeMove($square);
    });
  }

  makeMove($square) {
    let pos = $square.data("pos");
    if ($square.attr('class') !== 'empty_box') {
      return alert('Invalid move!');
    }
    this.game.playMove(pos);
    let new_class = this.game.currentPlayer === 'x' ? 'X' : 'O';

    $square.addClass(new_class);
    $square.removeClass('empty_box');

    if (this.game.isOver()) {
      let winner = this.game.currentPlayer;
      let $caption = $(`<figcaption>You win, ${winner.toUpperCase()}</figcaption>`);
      this.el.append($caption);
      this.el.addClass('gameover');
      if(winner === 'x') {
        this.el.addClass('winner-x');
      } else {
        this.el.addClass('winner-o');
      }
      this.el.off('click','li');
    }
  }

  setupBoard() {
    const $ul = $("<ul class ='board'></ul>");
    for(let i = 0; i <= 2; i++) {
      for(let j = 0; j <= 2; j++) {
        let array = [i, j];
        $ul.append(`<li class='empty_box' data-pos = [${array}]></li>`);
      }
    }
    return $ul;
  }
}

module.exports = View;
