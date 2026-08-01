// Game Screens
const gameStartScreenNode = document.querySelector("#game-start-screen");
const gameplayScreenNode = document.querySelector("#gameplay-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const gameWinScreenNode = document.querySelector("#game-win-screen");
const gameplayContainerNode = document.querySelector("#gameplay-container");
const healthBarNode = document.querySelector("#health-bar");
const currentHealthNode = document.querySelector("#current-health");
const maxHealthNode = document.querySelector("#max-health");

// Buttons
const startButtonNode = gameStartScreenNode.querySelector("#start-game-btn");
const restartButtonOnGameOverNode =
  gameOverScreenNode.querySelector("#restart-game-btn");
const restartButtonOnWinNode =
  gameWinScreenNode.querySelector("#restart-game-btn");

class Game {
  constructor(initialState) {
    this.state;
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
        this.endGameplay();
        break;
      case "gamewin":
        this.showGameWinScreen();
        this.endGameplay();
        break;
    }

    this.state = state;
  }

  endGameplay() {
    clearInterval(this.gameplayLoopIntervalId);
    gameplayContainerNode.innerHTML = "";
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

  // Player logic
  spawnPlayer() {
    // Calculate the spawning point for the player (The exact middle of the gameplay-container.)
    // and set the initial position.
    this.player.x = this.maxX / 2 - this.player.width / 2;
    this.player.y = this.maxY / 2 - this.player.height / 2;
    this.player.node.style.left = `${this.player.x}px`;
    this.player.node.style.top = `${this.player.y}px`;

    gameplayContainerNode.append(this.player.node);
  }

  handlePlayer() {
    this.checkPlayerHealth();
  }

  checkPlayerHealth() {
    if (this.player.health <= 0) {
      this.changeGameState("gameover");
      console.log("GAME OVER!");
    }
  }

  // Enemy logic
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

  despawnEnemy(enemy) {
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    enemy.node.remove();
  }

  handleEnemies() {
    this.cleanEnemies();
  }

  cleanEnemies() {
    this.enemies.forEach(enemy => {
      if (enemy.health <= 0) {
        this.despawnEnemy(enemy);
      }
    });
  }

  // Projectile logic
  spawnProjectile(projectile) {
    this.playerProjectiles.push(projectile);
    gameplayContainerNode.append(projectile.node);
  }

  despawnProjectile(projectile) {
    this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1);
    projectile.node.remove();
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
    this.handleProjectileDamage();
  }

  cleanProjectiles() {
    this.playerProjectiles.forEach(projectile => {
      if(this.isProjectileOutOfBounds(projectile)) {
        this.despawnProjectile(projectile);
      }
    });
  }

  handleProjectileMovement() {
    this.playerProjectiles.forEach(projectile => {
      projectile.move();
    });
  }

  handleProjectileDamage() {
    this.playerProjectiles.forEach(projectile => {
      this.enemies.forEach(enemy => {
        if (enemy.isColliding(projectile)) {
          this.despawnProjectile(projectile);
          enemy.takeDamage(projectile.damage);
        }
      });
    });
  }
  
  // Gameplay logic
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
    instance.handleEnemies();
    instance.handlePlayer();
    // console.log(game);
    // if (instance.enemies[0] && instance.player.isColliding(instance.enemies[0])) {
    //   console.log("Collision detected!");
    // }
  }
}

// Init new game on load
let game = new Game("start");

// Event Listeners
startButtonNode.addEventListener("click", () => game.changeGameState("gameplay"));
restartButtonOnGameOverNode.addEventListener("click", () => game = new Game("gameplay"));
restartButtonOnWinNode.addEventListener("click", () => game = new Game("gameplay"));

window.addEventListener("keydown", (event) => {
  if (!game.player || game.state !== "gameplay") {
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
      break;
  }
});
