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

  handleAttack(player) {
    if (this.attackType === "explode" && this.isColliding(player)) {
      this.health = 0;
      return this.damage;
    }

    return 0;
  }

}
