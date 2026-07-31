class GameEntity {
  constructor(width, height, color, movementSpeed, maxX, maxY) {
    // Dimensions
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.width = width;
    this.height = height;

    // Create node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = color;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;

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
}
