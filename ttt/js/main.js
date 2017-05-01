const View = require('./ttt-view');
const Game = require('./../lib/game');

$( () => {
  const $fig = $('.ttt');
  const view = new View(new Game(), $fig);
  
});
