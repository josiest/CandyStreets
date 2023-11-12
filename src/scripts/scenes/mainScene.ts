import Player from '../objects/Player'
import CharacterSystem from '../character/CharacterSystem'

export default class MainScene extends Phaser.Scene {
    player: Player;
    characterSystem: CharacterSystem;

    constructor() {
        super({ key: 'MainScene' })
    }

    create() {
        const sceneWidth = this.cameras.main.width;
        const sceneHeight = this.cameras.main.height;

        this.player = new Player(this, sceneWidth / 2, sceneHeight / 2)

        this.characterSystem = new CharacterSystem(this, this.player);
        this.characterSystem.add(this, 'candy-lama',
                                 sceneWidth / 4, sceneHeight / 5);
        this.characterSystem.add(this, 'candy-pirate',
                                 3 * sceneWidth / 4, sceneHeight / 5);

    }

    update(time, deltaTime) {
        this.player.update(time, deltaTime);
    }
}
