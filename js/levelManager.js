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
    return this.currentWave === this.levels[this.currentLevel - 1].enemyWaves.length;
  }

  isLastLevel() {
    return this.currentLevel === this.maxLevel;
  }

  generateEnemyConfigs() {
    return {
      "exploder1": new EnemyConfig("exploder1", 54, 64, ["./assets/images/enemies/exploder1_1.png", "./assets/images/enemies/exploder1_2.png"], "./assets/images/enemies/green_splatter.png", null, 128, 25, 50, "exploding", 0, 0, 0, 0),
      "exploderBoss": new EnemyConfig("exploderBoss", 108, 128, ["./assets/images/enemies/exploder1_1.png", "./assets/images/enemies/exploder1_2.png"], "./assets/images/enemies/green_splatter.png", null, 128, 400, 50, "exploding", 0, 0, 0, 0),
      "venomShooter": new EnemyConfig("venomShooter", 52, 64, ["./assets/images/enemies/venom_shooter_1.png", "./assets/images/enemies/venom_shooter_2.png"], "./assets/images/enemies/green_splatter.png", "./assets/images/enemies/venom_ball.png", 128, 50, 25, "shooting", 0.33, 100, 16, 48),
    };
  }

  generateLevels() {
    return {
      // 0: new Level([
      //   [
      //     this.enemyConfigs["exploderBoss"],
      //   ],
      // ]),
      // 1: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 2: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 3: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 4: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 5: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 6: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 7: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 8: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 9: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      // 10: new Level([
      //   [
      //     this.enemyConfigs["exploder1"],
      //   ],
      // ]),
      0: new Level([
        [
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
      ]),
      1: new Level([
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
      ]),
      2: new Level([
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
      ]),
      3: new Level([
        [
          this.enemyConfigs["venomShooter"],
          this.enemyConfigs["venomShooter"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
        ],
        [
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["exploder1"],
          this.enemyConfigs["venomShooter"],
        ],
      ]),
      4: new Level([
        [
        this.enemyConfigs["exploderBoss"],
        ]
      ]),



    };
  }
}
