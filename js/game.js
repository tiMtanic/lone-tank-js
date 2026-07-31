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
    this.enemies = [];
    this.playerProjectiles = [];
    this.gameplayLoopIntervalId = null;
    this.maxX;
    this.maxY;

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
    this.player.x = this.maxX / 2 - this.player.width / 2;
    this.player.y = this.maxY / 2 - this.player.height / 2;
    this.player.node.style.left = `${this.player.x}px`;
    this.player.node.style.top = `${this.player.y}px`;

    gameplayContainerNode.append(this.player.node);
  }

  spawnEnemy() {
    const enemy = new Enemy(
      this.maxX,
      this.maxY
    );

    enemy.x = 0;
    enemy.y = 0;
    enemy.node.style.left = `${enemy.x}px`;
    enemy.node.style.top = `${enemy.y}px`;

    this.enemies.push(enemy);
    gameplayContainerNode.append(enemy.node);
  }

  spawnProjectile(projectile) {
    this.playerProjectiles.push(projectile);
    gameplayContainerNode.append(projectile.node);
  }

  canEntityMove(entity, desiredX, desiredY) {
    //Check if the entity will be inside bounds of the gameplay area
    if (desiredY < 0) {
      return false;
    } else if (desiredY > this.maxY - entity.height) {
      return false;
    } else if (desiredX < 0) {
      return false;
    } else if (desiredX > this.maxX - entity.width) {
      return false;
    }

    return true;
  }

  isProjectileOutOfBounds(projectile) {
    if (projectile.y < 0 - projectile.height) {
      return true;
    } else if (projectile.y > this.maxY) {
      return true;
    } else if (projectile.x < 0 - projectile.width) {
      return true;
    } else if (projectile.x > this.maxX) {
      return true;
    }

    return false;
  }

  handleProjectiles() {
    this.cleanProjectiles();
    this.handleProjectileMovement();
  }

  cleanProjectiles() {
    this.playerProjectiles.forEach(projectile => {
      if(this.isProjectileOutOfBounds(projectile)) {
        this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1);
        projectile.node.remove();
      }
    });
  }

  handleProjectileMovement() {
    this.playerProjectiles.forEach(projectile => {
      projectile.move();
    });
  }

  handleStartGameplay() {
    // Set gameplay area bounds
    this.maxX = gameplayContainerNode.offsetWidth;
    this.maxY = gameplayContainerNode.offsetHeight;

    this.player = new Player(
      this.maxX,
      this.maxY
    );
    this.spawnPlayer();
    this.spawnEnemy();
    this.gameplayLoopIntervalId = setInterval(this.gameplayLoop, 1000 / 60, this);
  }

  gameplayLoop(instance) {
    instance.handleProjectiles();
    // console.log(game);
    // if (instance.enemies[0] && instance.player.isColliding(instance.enemies[0])) {
    //   console.log("Collision detected!");
    // }
  }
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

  switch (event.code) {
    case "KeyW":
      if (game.canEntityMove(game.player, game.player.x, game.player.y - game.player.movementSpeed)) {
        game.player.moveForward();
      }
      break;
    case "KeyA":
      if (game.canEntityMove(game.player, game.player.x - game.player.movementSpeed, game.player.y)) {
        game.player.moveLeft();
      }
      break;
    case "KeyS":
      if (game.canEntityMove(game.player, game.player.x, game.player.y + game.player.movementSpeed)) {
        game.player.moveBackward();
      }
      break;
    case "KeyD":
      if (game.canEntityMove(game.player, game.player.x + game.player.movementSpeed, game.player.y)) {
        game.player.moveRight();
      }
      break;
    case "Space":
      let playerProjectile = game.player.shoot();
      game.spawnProjectile(playerProjectile);
      console.log(playerProjectile);
      break;
  }
});
