class GameEntity {
  constructor(width, height, color, healt, movementSpeed, maxX, maxY) {
    // Dimensions
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.width = width;
    this.height = height;
    this.lookDirection = [0, -1];
    this.movementDirection = [0, 0];

    // Create entity node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = color;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

    // Gameplay Properties
    this.health = 30;
    this.movementSpeed = movementSpeed;

    // Projectile Properties
    this.projectileWidth = 5;
    this.projectileHeight = 5;
    this.projectileSpeed = 500;
    this.projectileColor = "red";
    this.projectileDamage = 10;
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
    return new Projectile(this.x + this.width / 2 - this.projectileWidth / 2, this.y + this.height / 2 - this.projectileHeight / 2, this.projectileWidth, this.projectileHeight, this.projectileColor, structuredClone(this.lookDirection), this.projectileSpeed, this.projectileDamage);
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log("Damage:", amount);
    console.log("Health:", this.health);
  }
}
