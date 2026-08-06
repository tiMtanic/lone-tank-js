class Player extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 65;
    const height = 95;
    const color = "transparent";
    const movementSpeed = 100;
    const health = 100;

    const sprites = ["./assets/images/tank/tank_1.png", "./assets/images/tank/tank_2.png"];
    const gunSprite = "./assets/images/tank/guns/laser_gun.png"

    super(sprites, width, height, color, health, movementSpeed, maxX, maxY);

    // Unit Settings
    this.attackSpeed = 3;
    this.rotationSpeed = 90;
    this.rotationSpeedMultiplier = 1.0;
    this.projectileColor = "#00FFFF";
    this.projectileHeight = 32;

    // Audio
    this.firingSound = "./assets/sounds/laser-blaster-shot.mp3";
    this.movementSound = new Audio("./assets/sounds/tank-moving.flac");
    this.movementSound.volume = 0.02;
    this.movementSound.loop = true;

    // Node Configuration
    this.spriteNode.style.height = `${this.height * 1.25}px`;

    this.turretWidth = this.height * 1.4;
    this.turretHeight = this.height * 1.4;
    this.turretNode = document.createElement("div");
    this.turretNode.style.position = "absolute";
    this.turretNode.style.display = "flex";
    this.turretNode.style.justifyContent = "center";
    this.turretNode.style.alignItems = "flex-start";
    this.turretNode.style.backgroundColor = "transparent";
    this.turretNode.style.backgroundImage = `url("${gunSprite}")`;
    this.turretNode.style.backgroundPosition = "center center";
    this.turretNode.style.backgroundRepeat = "no-repeat"
    this.turretNode.style.width = `${this.turretWidth}px`;
    this.turretNode.style.height = `${this.turretHeight}px`;

    this.gunNode = document.createElement("div");
    this.gunNode.style.position = "absolute";
    this.gunNode.style.backgroundColor = "transparent";
    this.gunNode.style.width = `${4}px`;
    this.gunNode.style.height = `${this.height * 0.7}px`;

    this.projectileSpawnNode = document.createElement("div");
    this.projectileSpawnNode.style.position = "absolute";
    this.projectileSpawnNode.style.backgroundColor = "transparent";
    this.projectileSpawnNode.style.width = `${4}px`;
    this.projectileSpawnNode.style.height = `${4}px`;

    this.node.append(this.turretNode);
    this.turretNode.append(this.gunNode);
    this.turretNode.append(this.projectileSpawnNode);

    // Initially Update Health Bar
    this.updateHealthBarUI();
  }

  takeDamage(amount) {
    super.takeDamage(amount);
    this.updateHealthBarUI();
  }

  updateHealthBarUI() {
    currentHealthNode.innerText = Math.ceil(this.health);
    maxHealthNode.innerText = this.maxHealth;
    healthBarNode.style.width = `${this.health / this.maxHealth * 100}%`;
  }

  rotateLeft(deltaTime) {
    this.currentMovementAngle -= normalizeAngle((this.rotationSpeed * this.rotationSpeedMultiplier) / 1000 * deltaTime);
    this.node.style.transform = "rotate(" + this.currentMovementAngle + "deg)";
  }

  rotateRight(deltaTime) {
    this.currentMovementAngle += normalizeAngle((this.rotationSpeed * this.rotationSpeedMultiplier) / 1000 * deltaTime);
    this.node.style.transform = "rotate(" + this.currentMovementAngle + "deg)";
  }

  resetRotation() {
    this.currentMovementAngle = 0;
    this.node.style.transform = "rotate(" + this.currentMovementAngle + "deg)";
  }

  updateMovementVectorForward() {
    this.isMoving = true;

    if (this.movementSound) {
      this.movementSound.play();
    }

    this.movementDirection = directionFromDegrees(this.currentMovementAngle);
  }

  updateMovementVectorBackward() {
    this.isMoving = true;

    if (this.movementSound) {
      this.movementSound.play();
    }

    this.movementDirection = invertVector(directionFromDegrees(this.currentMovementAngle));
  }

  resetMovementVector() {
    this.isMoving = false;

    if (this.movementSound) {
      this.movementSound.pause();
    }

    this.movementDirection = [0, 0];
  }
}
