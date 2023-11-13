import CandyCat from '../objects/CandyCat'
import Level from '../objects/Level'

export default class MainScene extends Phaser.Scene {
  level:Level
  tempCameraControls:Phaser.Cameras.Controls.FixedKeyControl

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.level = new Level(this);
    new CandyCat(this, this.cameras.main.width / 2, this.cameras.main.height / 2)

    this.cameras.main.setBounds(0, 0, this.level.map.widthInPixels, this.level.map.heightInPixels)

    // temp
    if (this.input === null || this.input.keyboard === null) {
      console.warn("no keyboard input available")
    } else {
      const cursors = this.input.keyboard.createCursorKeys()
      this.tempCameraControls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: this.cameras.main,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        zoomIn: cursors.shift,
        zoomOut: cursors.space,
        minZoom: 0.125,
        maxZoom: 1.0,
        zoomSpeed: 0.01,
        speed: 1.5
      })
    }
  }

  update(time, delta) {
    this.tempCameraControls.update(delta)
  }
}
