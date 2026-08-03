// Game Screens
const gameStartScreenNode = document.querySelector("#game-start-screen");
const gameplayScreenNode = document.querySelector("#gameplay-screen");
const gameOverScreenNode = document.querySelector("#game-over-screen");
const gameWinScreenNode = document.querySelector("#game-win-screen");
const gameplayContainerNode = document.querySelector("#gameplay-container");
const healthBarNode = document.querySelector("#health-bar");
const currentHealthNode = document.querySelector("#current-health");
const maxHealthNode = document.querySelector("#max-health");
const currentLevelNode = document.querySelector("#current-level");

// Buttons
const startButtonNode = gameStartScreenNode.querySelector(".start-game-btn");
const restartButtonOnGameOverNode =
  gameOverScreenNode.querySelector(".restart-game-btn");
const restartButtonOnWinNode =
  gameWinScreenNode.querySelector(".restart-game-btn");

class Game {
  constructor(initialState) {
    this.state;
    this.player = null;
    this.playerController = new PlayerController();
    this.enemies = [];
    this.playerProjectiles = [];
    this.gameplayLoopIntervalId = null;
    this.maxX;
    this.maxY;
    this.timePreviousTick;
    this.spawnAreaOffset = 50;
    this.enemiesAmount = 1;
    this.currentLevel = 0;
    this.maxLevel = 2;

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
    this.player.init();
  }

  handlePlayer(deltaTime) {
    this.checkPlayerHealth();
    this.handlePlayerMovement(deltaTime);
  }

  checkPlayerHealth() {
    if (this.player.health <= 0) {
      this.changeGameState("gameover");
    }
  }

  handlePlayerMovement(deltaTime) {
    if (this.playerController.keyboardKeys.KeyW.isPressed) {
      game.player.movementDirection[1] = -1;
      game.player.lookDirection[1] = -1;
    } else if(this.playerController.keyboardKeys.KeyS.isPressed) {
      game.player.movementDirection[1] = 1;
      game.player.lookDirection[1] = 1;
    } else {
      game.player.movementDirection[1] = 0;
      
      if (game.player.movementDirection[0] !== 0) {
        game.player.lookDirection[1] = 0;
      }
    }

    if (this.playerController.keyboardKeys.KeyA.isPressed) {
      game.player.movementDirection[0] = -1;
      game.player.lookDirection[0] = -1;
    } else if (this.playerController.keyboardKeys.KeyD.isPressed) {
      game.player.movementDirection[0] = 1;
      game.player.lookDirection[0] = 1;
    } else {
      game.player.movementDirection[0] = 0;

      if (game.player.movementDirection[1] !== 0) {
        game.player.lookDirection[0] = 0;
      }
    }

    const desiredX = this.player.x + this.player.movementSpeed / 1000 * deltaTime * this.player.movementDirection[0];
    const desiredY = this.player.y + this.player.movementSpeed / 1000 * deltaTime * this.player.movementDirection[1];

    if (this.canEntityMove(this.player, desiredX, desiredY)) {
      this.player.moveTo(desiredX, desiredY);
    }
  }

  handlePlayerShooting() {
    if (this.playerController.mouseKeys.Mouse1.isPressed || this.playerController.keyboardKeys.Space.isPressed) {
      let playerProjectile = this.player.shoot();

      if (playerProjectile) {
        this.spawnProjectile(playerProjectile);
      }
    }
  }

  // Enemy logic
  spawnEnemy() {
    const enemy = new Enemy(
      this.maxX,
      this.maxY
    );

    const spawnDirection = Math.floor(Math.random() * 4);
    let enemySpawnPosition;

    switch(spawnDirection) {
      // top
      case 0:
        enemySpawnPosition = this.getRandomEnemySpawnPosition(enemy, 0, 0, this.maxX, this.spawnAreaOffset);
        break;
      // right
      case 1:
        enemySpawnPosition = this.getRandomEnemySpawnPosition(enemy, this.maxX - this.spawnAreaOffset, 0, this.maxX, this.maxY);
        break;
      // bottom
      case 2:
        enemySpawnPosition = this.getRandomEnemySpawnPosition(enemy, 0, this.maxY - this.spawnAreaOffset, this.maxX, this.maxY);
        break;
      // left
      case 3:
        enemySpawnPosition = this.getRandomEnemySpawnPosition(enemy, 0, 0, this.spawnAreaOffset, this.maxY);
        break;
    }

    enemy.x = enemySpawnPosition.x;
    enemy.y = enemySpawnPosition.y;
    enemy.node.style.left = `${enemy.x}px`;
    enemy.node.style.top = `${enemy.y}px`;

    this.enemies.push(enemy);
    gameplayContainerNode.append(enemy.node);
  }

  despawnEnemy(enemy) {
    this.enemies.splice(this.enemies.indexOf(enemy), 1);
    enemy.node.remove();
  }

  handleEnemySpawning() {
    if (this.enemies.length === 0) {
      if(this.currentLevel === this.maxLevel) {
        this.changeGameState("gamewin");
        return;
      }

      this.currentLevel++;
      this.updateLevelUI();

      for (let i = this.enemiesAmount; i > 0; i--) {
        this.spawnEnemy();
      }
      this.enemiesAmount++;
    }
  }

  getRandomEnemySpawnPosition(enemy, minX, minY, maxX, maxY) {
    const spawnPositionX = Math.floor(minX + Math.random() * (maxX - minX - enemy.width));
    const spawnPositionY = Math.floor(minY + Math.random() * (maxY - minY - enemy.height));

    return {
      x: spawnPositionX,
      y: spawnPositionY
    }
  }

  handleEnemyMovement(deltaTime) {
    this.enemies.forEach(enemy => {
      const desiredPosition = enemy.getNextDesiredMovement(this.player, deltaTime);

      if (this.canEntityMove(enemy, desiredPosition.desiredX, desiredPosition.desiredY)) {
        enemy.moveTo(desiredPosition.desiredX, desiredPosition.desiredY);
      }
    });
  }

  handleEnemyAttacks(deltaTime) {
    this.enemies.forEach(enemy => {
      const damage = enemy.handleAttack(this.player);

      if(damage > 0) {
        this.player.takeDamage(damage);
      }
    });
  }
  
  cleanEnemies() {
    this.enemies.forEach(enemy => {
      if (enemy.health <= 0) {
        this.despawnEnemy(enemy);
      }
    });
  }

  handleEnemies(deltaTime) {
    this.cleanEnemies();
    this.handleEnemyMovement(deltaTime);
    this.handleEnemyAttacks(deltaTime);
    this.handleEnemySpawning();
  }


  // Projectile logic
  spawnProjectile(projectile) {
    projectile.node.style.transform = "rotate(" + this.player.currentAngle + "deg)";
    this.playerProjectiles.push(projectile);
    gameplayContainerNode.append(projectile.node);
  }

  removeProjectileNode(projectile) {
    projectile.node.remove();
  }

  despawnProjectile(projectile) {
    this.removeProjectileNode(projectile);
    this.playerProjectiles.splice(this.playerProjectiles.indexOf(projectile), 1);
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

  handleProjectiles(deltaTime) {
    this.cleanProjectiles();
    this.handleProjectileMovement(deltaTime);
    this.handleProjectileDamage();
  }

  cleanProjectiles() {
    this.playerProjectiles.forEach(projectile => {
      if(this.isProjectileOutOfBounds(projectile)) {
        this.despawnProjectile(projectile);
      }

      if(!this.playerProjectiles.includes(projectile)) {
        console.log("x");
        this.removeProjectileNode(projectile);
      }
    });
  }

  handleProjectileMovement(deltaTime) {
    this.playerProjectiles.forEach(projectile => {
      projectile.move(deltaTime);
    });
  }

  handleProjectileDamage() {
    this.enemies.forEach(enemy => {
      this.playerProjectiles.forEach(projectile => {
        if (enemy.isColliding(projectile)) {
          this.despawnProjectile(projectile);
          enemy.takeDamage(projectile.damage);
        }
      });
    });
  }

  // UI logic
  updateLevelUI() {
    currentLevelNode.innerText = this.currentLevel;
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
    //this.playerController.setMouseAction("onPressed", this.onPlayerShooting.bind(this));
    //this.playerController.setKeyboardAction("Space", "onPressed", this.onPlayerShooting.bind(this));
    this.playerController.registerListeners();
    this.timePreviousTick = Date.now();
    this.gameplayLoopIntervalId = setInterval(this.gameplayLoop.bind(this), 1000 / 60);
  }

  getDeltaTime() {
    const deltaTime = Date.now() - this.timePreviousTick;
    this.timePreviousTick = Date.now();
    return deltaTime;
  }

  gameplayLoop() {
    const deltaTime = this.getDeltaTime();
    this.handleProjectiles(deltaTime);
    this.handleEnemies(deltaTime);
    this.handlePlayer(deltaTime);  
    this.playerController.handleTurretRotation(this.player);
    this.player.handleCooldowns(deltaTime);
    this.handlePlayerShooting();
  }
}

// Init new game on load
let game = new Game("start");

// Event Listeners
startButtonNode.addEventListener("click", () => game.changeGameState("gameplay"));
restartButtonOnGameOverNode.addEventListener("click", () => game = new Game("gameplay"));
restartButtonOnWinNode.addEventListener("click", () => game = new Game("gameplay"));
