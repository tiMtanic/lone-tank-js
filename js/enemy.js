class Enemy extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "red";
    const movementSpeed = 50;
    const health = 30;

    super(width, height, color, health, movementSpeed, maxX, maxY);

    this.attackType = "explode";
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

  handleAttack(target) {
    if (this.attackType === "explode" && this.isColliding(target)) {
      this.health = 0;
      return this.damage;
    }

    return 0;
  }

}
