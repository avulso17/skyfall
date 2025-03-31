import { Explosion } from "./Explosion";

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

  hurt(callback: () => void) {
    callback();

    if (this.alpha < 1) {
      return;
    }

    let explosion = new Explosion(this.scene, this.x, this.y);
    this.disableBody(true, true);

    this.scene.time.delayedCall(1000, () => {
      this.reset();
    });
  }

  reset() {
    const x = this.scene.scale.width / 2 - 8;
    const y = this.scene.scale.height + 64;
    this.enableBody(true, x, y, true, true);
    this.setAlpha(0.5);

    this.scene.tweens.add({
      targets: this,
      y: this.scene.scale.height - 64,
      duration: 1500,
      ease: "Power1",
      repeat: 0,
      onComplete: () => {
        this.setAlpha(1);
      },
      callbackScope: this.scene,
    });
  }
}
