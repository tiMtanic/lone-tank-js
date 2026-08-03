class Player extends GameEntity {
  constructor(maxX, maxY) {
    // Set Game Entity Properties
    const width = 40;
    const height = 40;
    const color = "blue";
    const movementSpeed = 100;
    const health = 100;

    super(width, height, color, health, movementSpeed, maxX, maxY);

    this.turretWidth = this.height * 1.4;
    this.turretHeight = this.height * 1.4;
    this.turretNode = document.createElement("div");
    this.turretNode.style.position = "absolute";
    this.turretNode.style.display = "flex";
    this.turretNode.style.justifyContent = "center";
    this.turretNode.style.alignItems = "flex-start";
    this.turretNode.style.backgroundColor = "transparent";
    this.turretNode.style.width = `${this.turretWidth}px`;
    this.turretNode.style.height = `${this.turretHeight}px`;

    this.gunNode = document.createElement("div");
    this.gunNode.style.position = "absolute";
    this.gunNode.style.backgroundColor = "yellow";
    this.gunNode.style.width = `${4}px`;
    this.gunNode.style.height = `${this.height * 0.7}px`;

    this.projectileSpawnNode = document.createElement("div");
    this.projectileSpawnNode.style.position = "absolute";
    this.projectileSpawnNode.style.backgroundColor = "transparent";
    this.projectileSpawnNode.style.width = `${4}px`;
    this.projectileSpawnNode.style.height = `${4}px`;
  }

  init() {
    this.node.append(this.turretNode);
    this.turretNode.append(this.gunNode);
    this.turretNode.append(this.projectileSpawnNode);
  }
}
