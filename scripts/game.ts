import * as Phaser from 'phaser'
import MainScene from './scenes/MainScene'
import PreloadScene from './scenes/PreloadScene'
import UIScene from './scenes/UIScene'

const DEFAULT_WIDTH = 1280
const DEFAULT_HEIGHT = 720

const config = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scale: {
    parent: 'phaser-game',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
  },
  scene: [PreloadScene, MainScene, UIScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    }
  }
}

window.onload = () => {
    console.log("starting game!");
    const game = new Phaser.Game(config);
}
