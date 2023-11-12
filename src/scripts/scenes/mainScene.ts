import Player from '../objects/Player'
import Character from '../character/Character'

export default class MainScene extends Phaser.Scene {
    player: Player;
    characters: Array<Character>;

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;
        this.player = new Player(this, sceneWidth / 2, sceneHeight / 2)
        this.characters = [
            new Character(this, 'candy-lama', sceneWidth / 4, sceneHeight / 5),
            new Character(this, 'candy-pirate', 3 * sceneWidth / 4, sceneHeight / 5)
        ];
    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
    }
}
