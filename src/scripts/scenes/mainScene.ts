import CandyCat from '../objects/CandyCat'

export default class MainScene extends Phaser.Scene {
    player: CandyCat;

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        this.player = new CandyCat(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
    }
}
