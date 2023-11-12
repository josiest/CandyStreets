import CandyCat from '../objects/CandyCat'
import Level from '../objects/Level'

export default class MainScene extends Phaser.Scene {
  level:Level
  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.level = new Level(this);
    new CandyCat(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
  }

  update() {
    
  }
}
