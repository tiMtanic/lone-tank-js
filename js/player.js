class Player {
  constructor(maxX, maxY) {
    // Dimensions
    this.x = 0;
    this.y = 0;
    this.maxX = maxX;
    this.maxY = maxY;
    this.width = 40;
    this.height = 40;

    // Create Player Node
    this.playerNode = document.createElement("div");
    this.playerNode.style.position = "absolute";
    this.playerNode.style.backgroundColor = "blue";
    this.playerNode.style.width = `${this.width}px`;
    this.playerNode.style.height = `${this.height}px`;

    // Player Gameplay Properties
    this.movementSpeed = 5;
  }

  moveForward() {
    if (this.y < 0 + this.movementSpeed) {
      return;
    }

    this.y -= this.movementSpeed;
    this.playerNode.style.top = `${this.y}px`;
  }

  moveBackward() {
    if (this.y + this.movementSpeed > this.maxY - this.height) {
      return;
    }

    this.y += this.movementSpeed;
    this.playerNode.style.top = `${this.y}px`;
  }

  moveLeft() {
    if (this.x < 0 + this.movementSpeed) {
      return;
    }

    this.x -= this.movementSpeed;
    this.playerNode.style.left = `${this.x}px`;
  }

  moveRight() {
    if (this.x + this.movementSpeed > this.maxX - this.width) {
      return;
    }

    this.x += this.movementSpeed;
    this.playerNode.style.left = `${this.x}px`;
  }
}
