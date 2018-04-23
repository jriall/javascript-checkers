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
    this.blackPieces = [...document.getElementsByClassName('black-piece')]
    this.redScoreView = document.getElementById('red-score');
    this.blackScoreView = document.getElementById('black-score');
    this.redScore = 0;
    this.blackScore = 0;
    this.pieces.forEach(el => {
      el.addEventListener(EventType.CLICK, () => {
        this.handleSelect(el);
      });
    });
    this.canMove()
  }

  handleSelect(el) {
    if ([...el.classList].includes(Modifier.SELECTED)) {
      el.classList.add(Modifier.MOVABLE);
      el.classList.remove(Modifier.SELECTED);
    } else {
      this.pieces.forEach(a => a.classList.remove(Modifier.SELECTED));
      el.classList.add(Modifier.SELECTED);
      el.classList.remove(Modifier.MOVABLE);
    }
  }

  canMove(playerTurn) {
    if (playerTurn === Player.RED) {
      this.redPieces.slice(0, 4).forEach(a => {
        a.classList.add(Modifier.MOVABLE);
      });
    } else {
      this.blackPieces.slice(8).forEach(a => {
        a.classList.add(Modifier.MOVABLE);
      });
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
