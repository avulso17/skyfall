export class Ship extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.scene.add.existing(this);
    this.init();
    this.setInteractive();
  }

  init() {
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: "ship1-anim",
      frames: this.scene.anims.generateFrameNumbers("ship"),
      frameRate: 20,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "ship2-anim",
      frames: this.scene.anims.generateFrameNumbers("ship2"),
      frameRate: 20,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "ship3-anim",
      frames: this.scene.anims.generateFrameNumbers("ship3"),
      frameRate: 20,
      repeat: -1,
    });
    this.scene.anims.create({
      key: "explode",
      frames: this.scene.anims.generateFrameNumbers("explosion"),
      frameRate: 20,
      repeat: 0,
      hideOnComplete: true,
    });
  }
}
