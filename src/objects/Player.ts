export class Player extends Phaser.Physics.Arcade.Sprite {
  speed: number = 200;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "player");
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.init();
    this.play("player");
    this.setCollideWorldBounds(true);
  }

  init() {
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: "player",
      frames: this.scene.anims.generateFrameNames("player"),
      frameRate: 10,
      repeat: -1,
    });
  }
}
