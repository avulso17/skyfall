import { Boot } from "./core/Boot";
import { Preloader } from "./core/Preloader";
import { Game as MainGame } from "./scenes/Game";

import { Game, Types } from "phaser";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 256,
  height: 272,
  pixelArt: true,
  roundPixels: false,
  parent: "game-container",
  backgroundColor: 0x000000,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [Boot, Preloader, MainGame],
};

export default new Game(config);
