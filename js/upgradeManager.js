class UpgradeManager {
  constructor(player, onAfterSelectUpgradeCallback) {
    this.player = player;
    this.onAfterSelectUpgradeCallback = onAfterSelectUpgradeCallback;
    this.upgrades = this.getUpgrades();
    this.options = [];
    this.optionRepair = null;

    // Upgrade Probabilities
    this.bronzeProbability = 0.45;
    this.silverProbability = 0.35;
    this.goldProbability = 0.2;
  }

  getUpgrades() {
    return {
      bronze: [
        { upgradeQuality: "bronze", upgradeType: "Attack Speed", amount: 5, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "bronze", upgradeType: "Damage", amount: 5, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "bronze", upgradeType: "Movement Speed", amount: 5, icon: "./assets/images/tank/tank_1.png" },
        { upgradeQuality: "bronze", upgradeType: "Projectile Speed", amount: 10, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "bronze", upgradeType: "Health", amount: 5, icon: "./assets/images/tank/tank_1.png" },
      ],
      silver: [
        { upgradeQuality: "silver", upgradeType: "Attack Speed", amount: 10, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "silver", upgradeType: "Damage", amount: 10, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "silver", upgradeType: "Movement Speed", amount: 10, icon: "./assets/images/tank/tank_1.png" },
        { upgradeQuality: "silver", upgradeType: "Projectile Speed", amount: 20, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "silver", upgradeType: "Health", amount: 10, icon: "./assets/images/tank/tank_1.png" },
      ],
      gold: [
        { upgradeQuality: "gold", upgradeType: "Attack Speed", amount: 20, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "gold", upgradeType: "Damage", amount: 20, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "gold", upgradeType: "Movement Speed", amount: 20, icon: "./assets/images/tank/tank_1.png" },
        { upgradeQuality: "gold", upgradeType: "Projectile Speed", amount: 40, icon: "./assets/images/tank/guns/laser_gun.png" },
        { upgradeQuality: "gold", upgradeType: "Health", amount: 20, icon: "./assets/images/tank/tank_1.png" },
      ]
    };
  }

  updateUpgradeOptions() {
    const upgrades = structuredClone(this.upgrades);
    this.options = [];

    for (let i = 3; i > 0; i--) {
      const randomQuality = Math.random();

      if (randomQuality <= this.bronzeProbability) {
        // Bronze
        const selectedUpgrade = upgrades.bronze[Math.floor(Math.random() * upgrades.bronze.length)];
        this.options.push(selectedUpgrade);
        upgrades.bronze.splice(upgrades.bronze.indexOf(selectedUpgrade), 1);
      } else if (randomQuality <= this.bronzeProbability + this.silverProbability) {
        // Silver
        const selectedUpgrade = upgrades.silver[Math.floor(Math.random() * upgrades.silver.length)];
        this.options.push(selectedUpgrade);
        upgrades.silver.splice(upgrades.silver.indexOf(selectedUpgrade), 1);
      } else {
        // Gold
        const selectedUpgrade = upgrades.gold[Math.floor(Math.random() * upgrades.gold.length)];
        this.options.push(selectedUpgrade);
        upgrades.gold.splice(upgrades.gold.indexOf(selectedUpgrade), 1);
      }
    }

    this.updateSelectionNodes()
  }

  updateSelectionNodes() {
    this.resetCardStyle();

    const selectionNodes = [upgradeSelection1Node, upgradeSelection2Node, upgradeSelection3Node];

    for (let i = 0; i < selectionNodes.length; i++) {
      selectionNodes[i].querySelector("img").src = this.options[i].icon;
      selectionNodes[i].querySelector("p").innerText = `${this.options[i].upgradeType} +${this.options[i].amount}${this.options[i].upgradeType !== "Health" ? "%" : ""}`;
      selectionNodes[i].classList.add(this.options[i].upgradeQuality + "-card");
    }
  }

  resetCardStyle() {
    const selectionNodes = [upgradeSelection1Node, upgradeSelection2Node, upgradeSelection3Node];

    for (let i = 0; i < selectionNodes.length; i++) {
      selectionNodes[i].classList.remove("bronze-card");
      selectionNodes[i].classList.remove("silver-card");
      selectionNodes[i].classList.remove("gold-card");
    }
  }

  applyOption1() {
    this.applyUpgradeToPlayer(this.options[0]);
    this.onAfterSelectUpgradeCallback();
  }

  applyOption2() {
    this.applyUpgradeToPlayer(this.options[1]);
    this.onAfterSelectUpgradeCallback();
  }

  applyOption3() {
    this.applyUpgradeToPlayer(this.options[2]);
    this.onAfterSelectUpgradeCallback();
  }

  applyRepair() {
    this.player.health = this.player.maxHealth;
    this.onAfterSelectUpgradeCallback();
  }

  applyUpgradeToPlayer(selectedUpgrade) {
    if (selectedUpgrade.upgradeType === "Attack Speed") {
      this.player.attackSpeedMultiplier += selectedUpgrade.amount / 100;
    } else if (selectedUpgrade.upgradeType === "Damage") {
      this.player.damageMultiplier += selectedUpgrade.amount / 100;
    } else if (selectedUpgrade.upgradeType === "Movement Speed") {
      this.player.movementSpeedMultiplier += selectedUpgrade.amount / 100;
      this.player.rotationSpeedMultiplier += selectedUpgrade.amount / 100;
    } else if (selectedUpgrade.upgradeType === "Projectile Speed") {
      this.player.projectileSpeedMultiplier += selectedUpgrade.amount / 100;
    } else if (selectedUpgrade.upgradeType === "Health") {
      this.player.health += selectedUpgrade.amount;
      this.player.maxHealth += selectedUpgrade.amount;
    }
  }
}