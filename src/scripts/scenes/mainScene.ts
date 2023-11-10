import PhaserLogo from '../objects/phaserLogo'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    new PhaserLogo(this, this.cameras.main.width / 2, 0)
  }

  update() {
  }
}
