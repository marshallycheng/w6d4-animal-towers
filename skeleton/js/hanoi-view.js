class HanoiView {
  constructor(HanoiGame, rootEl) {
    this.game = HanoiGame;
    this.el = rootEl;
    this.setupTowers();
    this.render();
    this.firstClick = true;
    this.firstPile = null;

    this.installHandlers();
  }

  setupTowers() {
    const $rootEl = $(this.el);

    for (let i = 0; i < 3; i++) {
      let $ul = $(`<ul data-tower-id=${i}></ul>`);

      for (let j = 0; j < 3; j++) {
        let arr = [i, j];
        let $li = $(`<li data-id=[${arr}]></li>`);
        $ul.append($li);
      }

      $rootEl.append($ul);
    }
  }

  render() {
    let towers = this.game.towers;
    $('li').removeClass('_1 _2 _3');

    towers.forEach(function(tower, i, towers) {
      let targetTower = $(`*[data-tower-id='${i}']`);
      if (towers[i].length != 0) {
        tower.forEach(function(el, j, tower) {
          let targetDisc = $(`*[data-id='[${i},${j}]']`);
          targetDisc.addClass(`_${el}`);
        });
      }
    });
    if (this.game.isWon()) {
      const towers = $('ul');
      towers.off("click");
      this.el.addClass('winner');
      $('li').removeClass('_1 _2 _3');
      // setTimeout(() => alert('GOOD BOY!!!!'), 0);
    }
  }

  installHandlers() {
    const towers = $('ul');
    towers.on("click", (e) => {
      if(this.firstClick) {
        let tower = $(e.currentTarget);
        this.firstPile = tower.data('tower-id');
        this.firstClick = false;
        tower.addClass('selected');
      } else {
        let tower = $(e.currentTarget);
        let secondPile = tower.data('tower-id');
        if (!this.game.move(this.firstPile, secondPile)) {
          alert('Invalid Move!');
        }
        towers.removeClass('selected');
        this.firstClick = true;
      }
      this.render();
    });
  }

}

module.exports = HanoiView;
