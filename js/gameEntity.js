class GameEntity {
  constructor(sprites, width, height, color, health, movementSpeed, maxX, maxY) {
    // Dimensions
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.width = width;
    this.height = height;
    this.lookDirection = [0, -1];
    this.currentAimAngle = 0;
    this.movementDirection = [0, 0];
    this.currentMovementAngle = 0;
    this.isMoving = false;

    // Display
    this.sprites = sprites;
    this.currentSpriteIndex = 0;
    this.movementAnimationSpeed = 128;
    this.movementAnimationSpeedCooldown = this.movementAnimationSpeed;
    this.projectileSprite;

    // Audio
    this.firingSound;
    this.movementSound;

    // Attack
    this.attackSpeed = 1.00;
    this.attackCooldown = 0;
    this.attackType = "shooting";

    // Create entity node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.display = "flex";
    this.node.style.justifyContent = "center";
    this.node.style.alignItems = "center";
    // this.node.style.backgroundColor = color;
    this.node.style.backgroundImage = `url("${this.sprites[this.currentSpriteIndex]}")`;
    this.node.style.backgroundPosition = "center center";
    this.node.style.backgroundRepeat = "no-repeat"
    this.node.style.backgroundSize = "contain";
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    // Gameplay Properties
    this.health = health;
    this.maxHealth = health;
    this.movementSpeed = movementSpeed;

    // Projectile Properties
    this.projectileSpawnNode;
    this.projectileWidth = 4;
    this.projectileHeight = 20;
    this.projectileSpeed = 500;
    this.projectileColor = "red";
    this.damage = 10;
  }

  isColliding(otherEntity) {
    if (!otherEntity) {
      return false;
    }

    return (
      this.x < otherEntity.x + otherEntity.width &&
      this.x + this.width > otherEntity.x &&
      this.y < otherEntity.y + otherEntity.height &&
      this.y + this.height > otherEntity.y
    );
  }

  moveTo(newX, newY) {
    this.x = newX;
    this.y = newY;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }

  shoot() {
    if (this.attackType !== "shooting" || this.attackCooldown > 0) {
      return null;
    }

    if (this.firingSound) {
      const sound = new Audio(this.firingSound);
      sound.play();
    }

    this.attackCooldown = this.attackSpeed * 1000;

    const projectileSpawnNodePosition = getGameplayPositionCenter(this.projectileSpawnNode);

    return new Projectile(projectileSpawnNodePosition[0] - this.projectileWidth / 2, projectileSpawnNodePosition[1] - this.projectileHeight / 2, this.projectileWidth, this.projectileHeight, this.projectileColor, structuredClone(this.lookDirection), this.projectileSpeed, this.damage, this.projectileSprite);
  }

  takeDamage(amount) {
    new Audio("./assets/sounds/hitmarker-sound-effect.mp3").play();
    
    if (this.health - amount > 0) {
      
      this.health -= amount;
    } else {
      new Audio("./assets/sounds/splash.mp3").play();
      this.disableAudio();
      this.health = 0;
    }
  }

  disableAudio() {
    if(this.movementSound){
      this.movementSound.pause();
      this.movementSound = null;
    }
  }

  handleCooldowns(deltaTime) {
    this.attackCooldown -= deltaTime;
  }

  handleAnimations(deltaTime) {
    this.movementAnimationSpeedCooldown -= deltaTime;

    if (this.movementAnimationSpeedCooldown <= 0 && this.sprites && this.isMoving) {
      if (this.sprites[this.currentSpriteIndex + 1]) {
        this.currentSpriteIndex++;
      } else {
        this.currentSpriteIndex = 0;
      }

      this.movementAnimationSpeedCooldown = this.movementAnimationSpeed;
      this.updateBackgroundImage();
    }
  }

  updateBackgroundImage() {
    this.node.style.backgroundImage = `url("${this.sprites[this.currentSpriteIndex]}")`;
  }
}
