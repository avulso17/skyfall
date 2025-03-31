export class Explosion extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "explosion");
    this.scene = scene;
    this.scene.add.existing(this);
    this.init();
  }

  init() {
    this.createAnimation();
    this.play("explode");
  }

  createAnimation() {
    this.scene.anims.create({
      key: "explode",
      frames: this.scene.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
  }
}
