class Projectile {
  constructor(x, y, width, height, color, direction, speed, damage) {
    // Dimensions
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.direction = direction;
    this.projectileSpeed = speed;
    this.damage = damage;

    // Create projectile node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";
    this.node.style.backgroundColor = this.color;
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
  }

  move() {
    this.x = this.x + this.projectileSpeed * this.direction[0];
    this.y = this.y + this.projectileSpeed * this.direction[1];
    this.updateNodePosition();
  }

  updateNodePosition() {
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}