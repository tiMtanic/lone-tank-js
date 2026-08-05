class Projectile {
  constructor(x, y, width, height, color, direction, speed, damage, sprite) {
    // Dimensions
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.direction = direction;
    this.projectileSpeed = speed;
    this.damage = damage;
    this.sprite = sprite;

    // Create projectile node
    this.node = document.createElement("div");
    this.node.style.position = "absolute";

    if (this.sprite) {
      this.node.style.backgroundImage = `url("${this.sprite}")`;
      this.node.style.backgroundPosition = "center center";
      this.node.style.backgroundRepeat = "no-repeat"
      this.node.style.backgroundSize = "auto 100%";
    } else {
      this.node.style.backgroundColor = this.color;
      this.node.style.webkitBoxShadow = "0px 0px 4px 1px " + this.color;
      this.node.style.boxShadow = "0px 0px 4px 1px " + this.color;
    }

    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
    this.node.style.width = `${this.width}px`;
    this.node.style.height = `${this.height}px`;
    this.node.style.zIndex = "-1";

  }

  move(deltaTime) {
    this.x = this.x + this.projectileSpeed * this.direction[0] / 1000 * deltaTime;
    this.y = this.y + this.projectileSpeed * this.direction[1] / 1000 * deltaTime;
    this.updateNodePosition();
  }

  updateNodePosition() {
    this.node.style.left = `${this.x}px`;
    this.node.style.top = `${this.y}px`;
  }
}