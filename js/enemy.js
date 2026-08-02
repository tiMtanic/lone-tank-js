class Enemy extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "red";
    const movementSpeed = 50;
    const health = 10;

    super(width, height, color, health, movementSpeed, maxX, maxY);
  }
}
