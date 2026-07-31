class Player extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "blue";
    const movementSpeed = 5;

    super(width, height, color, movementSpeed, maxX, maxY);
  }

  moveForward() {
    if (this.y < 0 + this.movementSpeed) {
      return;
    }

    this.y -= this.movementSpeed;
    this.node.style.top = `${this.y}px`;
  }

  moveBackward() {
    if (this.y + this.movementSpeed > this.maxY - this.height) {
      return;
    }

    this.y += this.movementSpeed;
    this.node.style.top = `${this.y}px`;
  }

  moveLeft() {
    if (this.x < 0 + this.movementSpeed) {
      return;
    }

    this.x -= this.movementSpeed;
    this.node.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + this.movementSpeed > this.maxX - this.width) {
      return;
    }

    this.x += this.movementSpeed;
    this.node.style.left = `${this.x}px`;
  }
}
