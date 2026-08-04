class Enemy extends GameEntity {
  constructor(enemyConfig, maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "red";
    const movementSpeed = 50;
    const health = 30;

    super(enemyConfig.width, enemyConfig.height, color, enemyConfig.health, enemyConfig.movementSpeed, maxX, maxY);

    this.attackType = enemyConfig.attackType;
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
