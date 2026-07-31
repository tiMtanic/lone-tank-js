class Player {
  constructor() {
    this.width = 40;
    this.height = 60;

    // Create Player Node
    this.playerNode = document.createElement("div");
    this.playerNode.style.position = "absolute";
    this.playerNode.style.backgroundColor = "blue";
    this.playerNode.style.width = `${this.width}px`;
    this.playerNode.style.height = `${this.height}px`;
  }
}