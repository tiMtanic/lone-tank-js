class Enemy extends GameEntity {
  constructor(enemyConfig, maxX, maxY) {
    // Set Game Entity Properties
    const color = "red";

    super(enemyConfig.sprites, enemyConfig.width, enemyConfig.height, color, enemyConfig.health, enemyConfig.movementSpeed, maxX, maxY);

    // Display
    this.deathSprite = enemyConfig.deathSprite;
    this.projectileSprite = enemyConfig.projectileSprite;
    this.projectileWidth = enemyConfig.projectileWidth;
    this.projectileHeight = enemyConfig.projectileHeight;

    // Unit Settings
    this.attackType = enemyConfig.attackType;
    this.attackSpeed = enemyConfig.attackSpeed;
    this.attackCooldown = 1000 / this.attackSpeed;
    this.projectileSpeed = enemyConfig.projectileSpeed;
    this.damage = enemyConfig.projectileDamage;
    this.movementAnimationSpeed = enemyConfig.movementAnimationSpeed;
    this.isMoving = true;
    this.rotateSprite = enemyConfig.rotateSprite;

    // Node Configuration
    this.node.style.alignItems = "flex-start";

    this.deathSpriteNode = document.createElement("div");
    this.deathSpriteNode.style.position = "absolute";
    this.deathSpriteNode.style.display = "flex";
    this.deathSpriteNode.style.justifyContent = "center";
    this.deathSpriteNode.style.alignItems = "center";
    this.deathSpriteNode.style.backgroundImage = `url("${this.deathSprite}")`;
    this.deathSpriteNode.style.backgroundPosition = "center center";
    this.deathSpriteNode.style.backgroundRepeat = "no-repeat"
    this.deathSpriteNode.style.backgroundSize = "contain";
    this.deathSpriteNode.style.width = `${this.width}px`;
    this.deathSpriteNode.style.height = `${this.height}px`;
    this.deathSpriteNode.style.zIndex = "-99";

    this.projectileSpawnNode = document.createElement("div");
    this.projectileSpawnNode.style.position = "absolute";
    this.projectileSpawnNode.style.backgroundColor = "transparent";
    this.projectileSpawnNode.style.width = `${4}px`;
    this.projectileSpawnNode.style.height = `${4}px`;

    if (!this.rotateSprite) {
      this.node.style.alignItems = "center";
      this.node.style.justifyContent = "center";
    }

    this.node.append(this.projectileSpawnNode);
  }

  getNextDesiredMovement(target, deltaTime) {
      this.movementDirection = getNormalizedDirectionVector([this.x, this.y], [target.x, target.y]);
      this.lookDirection = this.movementDirection;

      const desiredX = this.x + this.movementSpeed / 1000 * deltaTime * this.movementDirection[0];
      const desiredY = this.y + this.movementSpeed / 1000 * deltaTime * this.movementDirection[1];

      return {
        desiredX: desiredX,
        desiredY: desiredY
      }
  }

  handleMeleeAttack(target) {
    if (this.isColliding(target)) {
      const damage = this.health;
      this.health = 0;
      return damage;
    }

    return 0;
  }

  handleRotation() {
    if (this.rotateSprite) {
      this.currentMovementAngle = normalizeAngle(rotationFromDirection(this.movementDirection));
      this.node.style.transform = "rotate(" + this.currentMovementAngle + "deg)";
    } else {
      this.node.style.transform = "rotate(180deg)";
    }
  }

  getDeathSpriteNode() {
    this.deathSpriteNode.style.left = `${this.x}px`;
    this.deathSpriteNode.style.top = `${this.y}px`;
    this.deathSpriteNode.style.transform = "rotate(" + this.currentMovementAngle + "deg)";
    return this.deathSpriteNode;
  }

}
