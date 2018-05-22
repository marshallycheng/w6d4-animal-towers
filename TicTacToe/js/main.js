const View = require('./ttt-view.js');
const Game = require('../solution/game.js');

$( () => {
  const board = $('.ttt');
  const game = new Game();
  const view = new View(game, board);

});
