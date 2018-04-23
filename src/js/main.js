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

class App {
  constructor() {
    this.pieces = [...document.getElementsByClassName('piece')];
    this.redPieces = [...document.getElementsByClassName('red-piece')];
    this.blackPieces = [...document.getElementsByClassName('black-piece')];
    this.gameTiles = [...document.getElementsByClassName('game-tile')]
    this.redScoreView = document.getElementById('red-score');
    this.blackScoreView = document.getElementById('black-score');
    this.redScore = 0;
    this.blackScore = 0;
    this.pieces.forEach(el => {
      el.addEventListener(EventType.CLICK, () => {
        this.handleSelect(el);
      });
    });
    this.gameTiles.forEach(el => {
      el.addEventListener(EventType.CLICK, (a) => {
        this.movePiece(this.selected, a);
      })
    });
    this.canMove();
    this.selected = ''
  }

  isEmpty(tile) {
    if (tile.target.children.length > 0 || tile.target.tagName === 'IMG') {
      return false;
    } else {
      return true;
    }
  }

  movePiece(piece, newLocation) {
    console.log(newLocation.target);
    if (this.isEmpty(newLocation)) {
      const oldLocation = document.getElementById(piece);
      oldLocation.parentNode.removeChild(oldLocation);
      const color = piece.split('-')[0];
      newLocation.target.innerHTML =
          `<img
              class="piece ${color}-piece"
              src="./images/checkers-checker-${color}.svg"
              alt="${color.charAt(0).toUpperCase() + color.slice(1)} piece"
              id="${piece}">
          `
    }
  }

  handleSelect(el) {
      if ([...el.classList].includes(Modifier.SELECTED)) {
        el.classList.add(Modifier.MOVABLE);
        el.classList.remove(Modifier.SELECTED);
        this.selected = '';
      } else {
        this.pieces.forEach(a => a.classList.remove(Modifier.SELECTED));
        el.classList.add(Modifier.SELECTED);
        el.classList.remove(Modifier.MOVABLE);
        this.selected = el.id;
      }
  }

  canMove(playerTurn) {
    // Highlights in white which pieces have available moves.
    if (playerTurn === Player.RED) {

    } else {

    }
  }

  increaseScore(scoreToIncrease, num) {
    if (scoreToIncrease = Player.RED) {
      this.redScore += num;
      this.redScoreView.innerHTML = this.redScore;
      if (this.redScore === 12) {
        this.handleVictory(Player.RED)
      }
    } else {
      this.blackScore += num;
      this.blackScoreView.innerHTML = this.blackScore;
      if (this.blackScore === 12) {
        this.handleVictory(Player.BLACK)
      }
    }
  }

  resetGame() {
    this.redScore = 0;
    this.blackScore = 0;
    this.redScoreView.innerHTML = 0;
    this.blackScoreView.innerHTML = 0;
  }

  handleVictory(winner) {

  }
}

window.addEventListener(EventType.LOAD, () => new App());
