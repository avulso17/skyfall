import { Scene } from "phaser";

export class Preloader extends Scene {
  constructor() {
    super("Preloader");
  }

  init() {
    //  We loaded this image in our Boot Scene, so we can display it here
    this.add.image(512, 384, "background");

    //  A simple progress bar. This is the outline of the bar.
    this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

    //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
    const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

    //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
    this.load.on("progress", (progress: number) => {
      //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
      bar.width = 4 + 460 * progress;
    });
  }

  preload() {
    //  Load the assets for the game - Replace with your own assets
    this.load.setPath("assets");

    // sounds
    this.load.audio("audio_shoot", ["sounds/beam.ogg", "sounds/beam.mp3"]);
    this.load.audio("audio_explosion", [
      "sounds/explosion.ogg",
      "sounds/explosion.mp3",
    ]);
    this.load.audio("audio_pickup", ["sounds/pickup.ogg", "sounds/pickup.mp3"]);
    this.load.audio("music", [
      "sounds/sci-fi_platformer12.ogg",
      "sounds/sci-fi_platformer12.mp3",
    ]);

    //fonts
    this.load.bitmapFont("pixelFont", "font/font.png", "font/font.xml");

    this.load.spritesheet("player", "sprites/player.png", {
      frameWidth: 16,
      frameHeight: 24,
    });

    this.load.spritesheet("shoot", "sprites/beam.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("ship", "sprites/ship-spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("ship2", "sprites/ship2-spritesheet.png", {
      frameWidth: 32,
      frameHeight: 16,
    });

    this.load.spritesheet("ship3", "sprites/ship3-spritesheet.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    this.load.spritesheet("explosion", "sprites/explosion-spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.spritesheet("power-up", "sprites/power-up-spritesheet.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
  }

  create() {
    //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
    //  For example, you can define global animations here, so we can use them in other scenes.

    //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
    this.scene.start("Game");
  }
}
