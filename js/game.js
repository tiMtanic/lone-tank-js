// Game Screens
const gameStartScreenNode = document.querySelector("#game-start-screen");
const gameplayScreenNode = document.querySelector("#gameplay-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const gameWinScreenNode = document.querySelector("#game-win-screen");
const gameplayContainerNode = document.querySelector("#gameplay-container");

// Buttons
const startButtonNode = gameStartScreenNode.querySelector("#start-game-btn");
const restartButtonOnGameOverNode =
  gameOverScreenNode.querySelector("#restart-game-btn");
const restartButtonOnWinNode =
  gameWinScreenNode.querySelector("#restart-game-btn");

class Game {
  constructor(initialState) {
    this.player = null;
    this.gameplayLoopIntervalId = null;
    this.changeGameState(initialState);
  }

  changeGameState(state) {
    switch (state) {
      case "start":
        this.showGameStartScreen();
        break;
      case "gameplay":
        this.showGameplayScreen();
        this.handleStartGameplay();
        break;
      case "gameover":
        this.showGameOverScreen();
        break;
      case "gamewin":
        this.showGameWinScreen();
        break;
    }
  }

  showGameStartScreen() {
    gameplayScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "none";
    gameWinScreenNode.style.display = "none";
    gameStartScreenNode.style.display = "flex";
  }

  showGameplayScreen() {
    gameStartScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "none";
    gameWinScreenNode.style.display = "none";
    gameplayScreenNode.style.display = "flex";
  }

  showGameOverScreen() {
    gameStartScreenNode.style.display = "none";
    gameplayScreenNode.style.display = "none";
    gameWinScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "flex";
  }

  showGameWinScreen() {
    gameStartScreenNode.style.display = "none";
    gameplayScreenNode.style.display = "none";
    gameOverScreenNode.style.display = "none";
    gameWinScreenNode.style.display = "flex";
  }

  spawnPlayer() {
    // Calculate the spawning point for the player (The exact middle of the gameplay-container.)
    // and set the initial position.
    this.player.x =
      gameplayContainerNode.offsetWidth / 2 - this.player.width / 2;
    this.player.y =
      gameplayContainerNode.offsetHeight / 2 - this.player.height / 2;
    this.player.playerNode.style.left = `${this.player.x}px`;
    this.player.playerNode.style.top = `${this.player.y}px`;

    gameplayContainerNode.append(this.player.playerNode);
  }

  handleStartGameplay() {
    this.player = new Player(
      gameplayContainerNode.offsetWidth,
      gameplayContainerNode.offsetHeight,
    );
    this.spawnPlayer();
    this.gameplayLoopIntervalId = setInterval(this.gameplayLoop, 1000 / 60);
  }

  gameplayLoop() {}
}

// Init new game on load
let game = new Game("start");

// Event Listeners
startButtonNode.addEventListener("click", () => {
  game.changeGameState("gameplay");
});

window.addEventListener("keydown", (event) => {
  if (!game.player) {
    return;
  }

  // prevent default behavior
  event.preventDefault();

  switch (event.key) {
    case "w":
      game.player.moveForward();
      break;
    case "a":
      game.player.moveLeft();
      break;
    case "s":
      game.player.moveBackward();
      break;
    case "d":
      game.player.moveRight();
      break;
  }
});
