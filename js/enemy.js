class Enemy extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "red";
    const movementSpeed = 5;

    super(width, height, color, movementSpeed, maxX, maxY);
  }
}
