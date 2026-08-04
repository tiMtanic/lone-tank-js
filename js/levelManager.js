class LevelManager {
  constructor() {
    this.enemyConfigs = this.generateEnemyConfigs();
    this.levels = this.generateLevels();

    this.currentLevel = 0;
    this.maxLevel = Object.keys(this.levels).length;
    this.currentWave = 0;
  }

  startNextLevel() {
    this.currentLevel++;
    this.currentWave = 0;

    return this.currentLevel;
  }

  getNextWave() {
    this.currentWave++;
    const nextWave = this.levels[this.currentLevel - 1].enemyWaves[this.currentWave - 1];
    return nextWave;
  }

  isLastWave() {
    console.log("currentWave", this.currentWave);
    console.log("maxWaveInLevel", this.levels[this.currentLevel - 1].enemyWaves.length);

    return this.currentWave === this.levels[this.currentLevel - 1].enemyWaves.length;
  }

  isLastLevel() {
    return this.currentLevel === this.maxLevel;
  }

  generateEnemyConfigs() {
    return {
      "exploder1": new EnemyConfig("exploder1", 40, 40, "", "", 30, 50, "exploding", 0, 0),
      "exploder2": new EnemyConfig("exploder2", 20, 20, "", "", 30, 50, "exploding", 0, 0),
      "shooter1": new EnemyConfig("shooter1", 40, 40, "", "", 30, 25, "shooting", 2.0, 100),
    };
  }

  generateLevels() {
    return {
      0: new Level([
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder2"], this.enemyConfigs["shooter1"]],
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      ]),
      1: new Level([
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
        [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      ]),
      // 2: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 3: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 4: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 5: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 6: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 7: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 8: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 9: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ]),
      // 10: new Level([
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]],
      //   [this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"], this.enemyConfigs["exploder1"]]
      // ])
    };
  }
}
