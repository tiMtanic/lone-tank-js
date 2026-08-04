class Enemy extends GameEntity {
  constructor(enemyConfig, maxX, maxY) {
    // Set Game Entity Properties
    const color = "red";

    super(enemyConfig.width, enemyConfig.height, color, enemyConfig.health, enemyConfig.movementSpeed, maxX, maxY);

    this.projectileSpawnNode = document.createElement("div");
    this.projectileSpawnNode.style.position = "absolute";
    this.projectileSpawnNode.style.backgroundColor = "transparent";
    this.projectileSpawnNode.style.width = `${4}px`;
    this.projectileSpawnNode.style.height = `${4}px`;

    this.attackType = enemyConfig.attackType;
    this.attackSpeed = enemyConfig.attackSpeed;
    this.attackCooldown = this.attackSpeed * 1000 * 2;
    this.projectileSpeed = enemyConfig.projectileSpeed;
  }

  init() {
    this.node.append(this.projectileSpawnNode);
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

  handleMeleeAttack(target) {
    if (this.isColliding(target)) {
      const damage = this.health;
      this.health = 0;
      return damage;
    }

    return 0;
  }

}
