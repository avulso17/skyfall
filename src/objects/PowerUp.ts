export class PowerUp extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.init();

    if (Math.random() < 0.5) {
      this.play("red");
    } else {
      this.play("gray");
    }
  }

  init() {
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: "red",
      frames: this.scene.anims.generateFrameNames("power-up", {
        start: 0,
        end: 1,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "gray",
      frames: this.scene.anims.generateFrameNames("power-up", {
        start: 2,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  addPowerUp(group: Phaser.GameObjects.Group) {
    group.add(this);
    this.setRandomPosition(
      0,
      0,
      this.scene.scale.width,
      this.scene.scale.height
    );
  }
}
