import Player from '../objects/Player'

export default class MainScene extends Phaser.Scene {
    player: Player;

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        this.player = new Player(this, this.cameras.main.width / 2, this.cameras.main.height / 2)
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
    }
}
