import CandyCat from '../objects/CandyCat'

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    new CandyCat(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
  }

  update() {
  }
}
