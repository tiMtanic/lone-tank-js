class Player extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "blue";
    const movementSpeed = 5;
    const health = 100;

    super(width, height, color, health, movementSpeed, maxX, maxY);
  }
}
