class GameEntity {
  constructor(width, height, color, movementSpeed, maxX, maxY) {
    // Dimensions
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.width = width;
    this.height = height;
    this.direction = [0, -1]; // Upwards Vector

    // Create entity node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = color;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    // Projectile Properties
    this.projectileWidth = 5;
    this.projectileHeight = 5;
    this.projectileSpeed = 5;
    this.projectileColor = "red";

    // Gameplay Properties
    this.movementSpeed = movementSpeed;
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

  moveForward() {
    this.y -= this.movementSpeed;
    this.node.style.top = `${this.y}px`;
    this.direction = [0, -1];
  }

  moveBackward() {
    this.y += this.movementSpeed;
    this.node.style.top = `${this.y}px`;
    this.direction = [0, 1];
  }

  moveLeft() {
    this.x -= this.movementSpeed;
    this.node.style.left = `${this.x}px`;
    this.direction = [-1, 0];
  }

  moveRight() {
    this.x += this.movementSpeed;
    this.node.style.left = `${this.x}px`;
    this.direction = [1, 0];
  }

  shoot() {
    return new Projectile(this.x + this.width / 2 - this.projectileWidth / 2, this.y + this.height / 2 - this.projectileHeight / 2, this.projectileWidth, this.projectileHeight, this.projectileColor, this.direction, this.projectileSpeed);
  }
}
