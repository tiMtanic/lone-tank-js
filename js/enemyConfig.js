class EnemyConfig {
  constructor(name, width, height, sprites, deathSprite, projectileSprite, movementAnimationSpeed, health, movementSpeed, attackType, attackSpeed, projectileSpeed, projectileWidth, projectileHeight, projectileDamage, rotateSprite) {
    this.name = name;
    this.width = width;
    this.movementAnimationSpeed = movementAnimationSpeed;
    this.height = height;
    this.sprites = sprites;
    this.deathSprite = deathSprite;
    this.projectileSprite = projectileSprite;
    this.health = health;
    this.movementSpeed = movementSpeed;
    this.attackType = attackType;
    this.attackSpeed = attackSpeed;
    this.projectileSpeed = projectileSpeed;
    this.projectileWidth = projectileWidth;
    this.projectileHeight = projectileHeight;
    this.projectileDamage = projectileDamage;
    this.rotateSprite = rotateSprite;
  }
}