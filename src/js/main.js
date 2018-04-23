const Player = {
  RED: 'red',
  BLACK: 'black',
}

const Modifier = {
  SELECTED: 'selected-piece',
  MOVABLE: 'can-move',
}

const EventType = {
  CLICK: 'click',
  LOAD: 'load',
}

const ClassName = {
  ROW: 'row',
}

const STARTING_BOARD = [
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
]

class App {
  constructor() {
    this.currentBoard = STARTING_BOARD;
    this.rows = [...document.getElementsByClassName(ClassName.ROW)];
    this.drawBoard();
  }

  drawBoard() {
    this.rows.forEach((a, rowIndex) => {
      [...a.childNodes]
        .filter(a => a.tagName === 'TD')
        .forEach((a, colIndex) => {
          if (this.currentBoard[rowIndex][colIndex] === 1) {
            a.innerHTML = this.renderPiece('black');
          }
          if (this.currentBoard[rowIndex][colIndex] === 2) {
            a.innerHTML = this.renderPiece('red');
          }
        })
      });
  }

  renderPiece(color) {
    return `<img class="piece ${color}-piece"
        src="/images/checkers-checker-${color}.svg"
        alt="${color} piece">`;
  }


}

window.addEventListener(EventType.LOAD, () => new App());
