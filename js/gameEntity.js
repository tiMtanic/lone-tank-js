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
    
    // Display
    this.sprites = sprites;
    this.currentSpriteIndex = 0;
    this.movementAnimationSpeed = 128;
    this.movementAnimationSpeedCooldown = this.movementAnimationSpeed;
    this.projectileSprite;

    // Audio
    this.firingSound;
    this.soundVolume = 0.20;
    this.movementSound;

    // Unit Settings
    this.attackSpeed = 1.00;
    this.attackCooldown = 0;
    this.attackSpeedMultiplier = 1;
    this.attackType = "shooting";
    this.health = health;
    this.maxHealth = health;
    this.movementSpeed = movementSpeed;
    this.movementSpeedMultiplier = 1.0;
    this.isMoving = false;

    // Projectile Properties
    this.projectileSpawnNode;
    this.projectileWidth = 4;
    this.projectileHeight = 20;
    this.projectileSpeed = 500;
    this.projectileSpeedMultiplier = 1.0;
    this.projectileColor = "red";
    this.damage = 10;
    this.damageMultiplier = 1.0;

    // Node Configuration
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.display = "flex";
    this.node.style.justifyContent = "center";
    this.node.style.alignItems = "center";
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    this.spriteNode = document.createElement("img");
    this.spriteNode.style.position = "absolute";
    this.spriteNode.style.height = `${this.height}px`;
    this.spriteNode.src = this.sprites[this.currentSpriteIndex];

    this.node.append(this.spriteNode);
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
      sound.volume = this.soundVolume;
      sound.play();
    }

    this.attackCooldown = 1000 / (this.attackSpeed * this.attackSpeedMultiplier);

    const projectileSpawnNodePosition = getGameplayPositionCenter(this.projectileSpawnNode);

    return new Projectile(projectileSpawnNodePosition[0] - this.projectileWidth / 2, projectileSpawnNodePosition[1] - this.projectileHeight / 2, this.projectileWidth, this.projectileHeight, this.projectileColor, structuredClone(this.lookDirection), this.projectileSpeed * this.projectileSpeedMultiplier, this.damage * this.damageMultiplier, this.projectileSprite);
  }

  takeDamage(amount) {
    const hitmarkerAudio = new Audio("./assets/sounds/hitmarker-sound-effect.mp3")
    hitmarkerAudio.volume = this.soundVolume;
    hitmarkerAudio.play();
    
    if (this.health - amount > 0) {
      
      this.health -= amount;
    } else {
      const deathAudio = new Audio("./assets/sounds/splash.mp3")
      deathAudio.volume = this.soundVolume;
      deathAudio.play();
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
    this.spriteNode.src = this.sprites[this.currentSpriteIndex];
  }
}
