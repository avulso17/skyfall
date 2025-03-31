import { Player } from "./Player";

type Scene = Phaser.Scene & {
  player: Player;
  projectiles: Phaser.GameObjects.Group;
};

export class Shoot extends Phaser.GameObjects.Sprite {
  constructor(scene: Scene) {
    const x = scene.player.x;
    const y = scene.player.y;

    super(scene, x, y, "shoot");
    scene.projectiles.add(this);
    this.scene = scene;
    this.scene.add.existing(this);
    this.init();
    this.play("shoot");
    this.scene.physics.world.enableBody(this);
    this.body!.velocity.y = -250;
  }

  init() {
    this.createAnimation();
  }

  createAnimation() {
    this.scene.anims.create({
      key: "shoot",
      frames: this.scene.anims.generateFrameNames("shoot"),
      frameRate: 20,
      repeat: -1,
    });
  }

  update() {
    if (this.y < 32) {
      this.destroy();
    }
  }
}
