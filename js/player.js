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
    this.y -= this.movementSpeed;
    this.node.style.top = `${this.y}px`;
  }

  moveBackward() {
    this.y += this.movementSpeed;
    this.node.style.top = `${this.y}px`;
  }

  moveLeft() {
    this.x -= this.movementSpeed;
    this.node.style.left = `${this.x}px`;
  }

  moveRight() {
      this.x += this.movementSpeed;
    this.node.style.left = `${this.x}px`;
  }
}
