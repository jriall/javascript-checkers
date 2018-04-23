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
    this.playerTurn = Player.RED;
    this.tiles = [...document.getElementsByTagName('TD')];
    this.pieces = [...document.getElementsByClassName('piece')];

    this.tiles.forEach(a => {
      a.addEventListener(EventType.CLICK, (a) => this.selectPiece(a.target));
    });
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

  selectPiece(el) {
    // Check we are selecting a piece and not an empty square,
    // and check we are selecting a piece which is of the right color
    if (el.tagName === 'IMG' && [...el.classList].includes(`${this.playerTurn}-piece`)) {
      const selectedRow = Number(el.parentElement.classList[0].split('-')[1]);
      const selectedCol = Number(el.parentElement.parentElement.classList[0].split('-')[1]);
      this.selectedPiece = [selectedRow, selectedCol];
      this.pieces.forEach(a => a.classList.remove(Modifier.SELECTED));
      el.classList.add(Modifier.SELECTED);
      console.log(this.selectedPiece);
    }
  }

  renderPiece(color) {
    return `<img class="piece ${color}-piece"
        src="/images/checkers-checker-${color}.svg"
        alt="${color} piece">`;
  }


}

window.addEventListener(EventType.LOAD, () => new App());
