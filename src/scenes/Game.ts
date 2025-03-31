import { Scene } from "phaser";

import { Player } from "../objects/Player";
import { PowerUp } from "../objects/PowerUp";
import { Ship } from "../objects/Ship";
import { Shoot } from "../objects/Shoot";

type ShipGeneric = Phaser.GameObjects.Sprite;

export class Game extends Scene {
  player: Player;
  camera: Phaser.Cameras.Scene2D.Camera;
  background: Phaser.GameObjects.TileSprite;
  ship: ShipGeneric;
  ship2: ShipGeneric;
  ship3: ShipGeneric;
  powerUps: Phaser.GameObjects.Group;
  enemies: Phaser.GameObjects.Group;
  maxObjects: number = 4;
  cursorsKeys?: Phaser.Types.Input.Keyboard.CursorKeys;
  spacebar?: Phaser.Input.Keyboard.Key;
  projectiles: Phaser.GameObjects.Group;

  constructor() {
    super("Game");
  }

  create() {
    const { width, height } = this.scale;

    this.background = this.add.tileSprite(0, 0, width, height, "background");
    this.background.setOrigin(0, 0);

    // Ships
    this.ship = new Ship(this, width / 2 - 50, height / 2, "ship");
    this.ship2 = new Ship(this, width / 2, height / 2, "ship2");
    this.ship3 = new Ship(this, width / 2 + 50, height / 2, "ship3");

    this.ship.play("ship1-anim");
    this.ship2.play("ship2-anim");
    this.ship3.play("ship3-anim");

    // enemies
    this.enemies = this.physics.add.group();

    for (let i = 0; i < this.maxObjects; i++) {
      this.enemies.add(this.ship);
      this.enemies.add(this.ship2);
      this.enemies.add(this.ship3);
    }

    this.input.on("gameobjectdown", this.destroyShip, this);

    // Power-up
    this.powerUps = this.physics.add.group();

    for (let i = 0; i < this.maxObjects; i++) {
      this.addPowerUp();
    }

    // Player
    this.player = new Player(this, width / 2, height / 2);
    this.cursorsKeys = this.input.keyboard?.createCursorKeys();
    this.spacebar = this.input.keyboard?.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    // Projectiles group
    this.projectiles = this.physics.add.group();

    // Collision
    this.physics.add.collider(
      this.powerUps,
      this.projectiles,
      this.destroyShoot,
      undefined,
      this
    );

    // Overlap
    this.physics.add.overlap(
      this.player,
      this.powerUps,
      this.pickPowerUp,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.enemies,
      this.hurtPlayer,
      undefined,
      this
    );

    this.physics.add.overlap(
      this.enemies,
      this.projectiles,
      this.hitEnemy,
      undefined,
      this
    );
  }

  update() {
    this.moveShip(this.ship, 1);
    this.moveShip(this.ship2, 2);
    this.moveShip(this.ship3, 3);

    this.background.tilePositionY -= 0.5;

    this.movePlayerManager();

    if (Phaser.Input.Keyboard.JustDown(this.spacebar!)) {
      this.shoot();
    }

    // Update projectiles for performance issues
    for (let i = 0; i < this.projectiles.getLength(); i++) {
      let projectile = this.projectiles.getChildren()[i];

      if (projectile instanceof Shoot) {
        projectile.update();
      }
    }
  }

  shoot() {
    let bullet = new Shoot(this);
  }

  addPowerUp() {
    let powerUp = new PowerUp(this, 0, 0, "power-up");
    powerUp.addPowerUp(this.powerUps);

    powerUp.setVelocity(100, 100);
    powerUp.setCollideWorldBounds(true);
    powerUp.setBounce(1);
  }

  pickPowerUp(player: Player, powerUp: PowerUp) {
    powerUp.disableBody(true, true);
  }

  destroyShoot(powerUp: PowerUp, projectile: Shoot) {
    // powerUp.destroy();
    projectile.destroy();
  }

  moveShip(ship: ShipGeneric, speed: number) {
    ship.y += speed;

    if (ship.y > this.scale.height) {
      this.resetShipPos(ship);
    }
  }

  resetShipPos(ship: ShipGeneric) {
    ship.y = 0;
    ship.x = Phaser.Math.Between(0, this.scale.width);
  }

  destroyShip(pointer: Phaser.Input.Pointer, gameObject: ShipGeneric) {
    gameObject.setTexture("explosion");
    gameObject.play("explode");
  }

  hitEnemy(enemie: ShipGeneric, projectile: Shoot) {
    projectile.destroy();
    this.resetShipPos(enemie);
  }

  hurtPlayer(player: Player, enemy: ShipGeneric) {
    this.resetShipPos(enemy);
    player.x = this.scale.width / 2 - 8;
    player.y = this.scale.height - 64;
  }

  movePlayerManager() {
    if (this.cursorsKeys?.left?.isDown) {
      this.player.setVelocityX(-this.player.speed);
    } else if (this.cursorsKeys?.right?.isDown) {
      this.player.setVelocityX(this.player.speed);
    } else {
      this.player.setVelocityX(0);
    }

    if (this.cursorsKeys?.up?.isDown) {
      this.player.setVelocityY(-this.player.speed);
    } else if (this.cursorsKeys?.down?.isDown) {
      this.player.setVelocityY(this.player.speed);
    } else {
      this.player.setVelocityY(0);
    }
  }
}
